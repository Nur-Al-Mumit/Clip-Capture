import React, { useState, useEffect } from 'react';
import { Zap, Clapperboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
    const [activeTab, setActiveTab] = useState('capture');
    const [startTime, setStartTime] = useState('0:00');
    const [endTime, setEndTime] = useState('1:00');
    const [isRecording, setIsRecording] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);

    // Get YouTube Video Title
    const [videoTitle, setVideoTitle] = useState('Video');
    useEffect(() => {
        // Load initial state
        chrome.storage.local.get(['extensionEnabled'], (result) => {
            if (result.extensionEnabled !== undefined) {
                setIsEnabled(result.extensionEnabled);
            }
        });

        // Listen for changes
        const handleStorageChange = (changes) => {
            if (changes.extensionEnabled) {
                setIsEnabled(changes.extensionEnabled.newValue);
            }
        };
        chrome.storage.onChanged.addListener(handleStorageChange);

        const getTitle = () => {
            let title = document.querySelector('ytd-watch-metadata h1')?.innerText ||
                document.querySelector('meta[property="og:title"]')?.content ||
                document.title.replace(/ - YouTube$/, "").trim();
            setVideoTitle(title && title !== "YouTube" ? title : "Video");
        };
        getTitle();

        return () => chrome.storage.onChanged.removeListener(handleStorageChange);
    }, []);

    const handleSetStart = () => {
        const video = document.querySelector('video');
        if (video) setStartTime(formatTime(video.currentTime));
    };

    const handleSetEnd = () => {
        const video = document.querySelector('video');
        if (video) setEndTime(formatTime(video.currentTime));
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        let ret = hrs > 0 ? `${hrs}:${mins < 10 ? '0' : ''}` : '';
        return `${ret}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleCapture = () => {
        const s = parseTime(startTime);
        const e = parseTime(endTime);
        const video = document.querySelector('video.html5-main-video');

        if (!video) return alert("Video not found!");
        if (e <= s) return alert("End must be after Start!");

        setIsRecording(true);

        // 1. Jump to start time
        video.currentTime = s;
        video.play();

        // 2. Setup the Stream Capture
        const stream = video.captureStream();
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9'
        });
        const chunks = [];

        mediaRecorder.ondataavailable = (ev) => {
            if (ev.data.size > 0) chunks.push(ev.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const cleanTitle = videoTitle.replace(/[\\/:"*?<>|]/g, "").substring(0, 100);
            a.href = url;
            a.download = `${cleanTitle}-${startTime.replace(/:/g, '-')}-${endTime.replace(/:/g, '-')}.webm`;
            a.click();

            setIsRecording(false);
        };

        mediaRecorder.start();

        // 3. Stop after the range length
        setTimeout(() => {
            mediaRecorder.stop();
            video.pause();
        }, (e - s) * 1000);
    };

    const parseTime = (timeStr) => {
        const parts = timeStr.trim().split(':').map(Number);
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        return parts[0] || 0;
    };

    if (!isEnabled) return null;

    return (
        <div id="yt-range-downloader-panel" className="yrd-premium-skin">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="yrd-container"
            >
                {/* Header */}
                <div className="yrd-header">
                    <div className="yrd-title">
                        <Clapperboard size={14} className="yrd-clapper-icon" />
                        <span className="yrd-video-title">{videoTitle}</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="yrd-content">
                    <div className="yrd-tabs">
                        <button
                            className={activeTab === 'capture' ? 'active' : ''}
                            onClick={() => setActiveTab('capture')}
                        >
                            Capture
                        </button>
                        <button
                            className={activeTab === 'format' ? 'active' : ''}
                            onClick={() => setActiveTab('format')}
                        >
                            Format
                        </button>
                    </div>

                    <div className="yrd-body">
                        {activeTab === 'capture' && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="capture"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="yrd-tab-view"
                                >
                                    <div className="yrd-input-group">
                                        <label>START TIME</label>
                                        <div className="yrd-input-wrapper">
                                            <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                            <button onClick={handleSetStart} className="yrd-btn-set">SET</button>
                                        </div>
                                    </div>

                                    <div className="yrd-input-group">
                                        <label>END TIME</label>
                                        <div className="yrd-input-wrapper">
                                            <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                            <button onClick={handleSetEnd} className="yrd-btn-set">SET</button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCapture}
                                        className={`yrd-btn-primary ${isRecording ? 'recording' : ''}`}
                                    >
                                        {isRecording ? (
                                            <>
                                                <div className="yrd-pulse-dot" />
                                                RECORDING...
                                            </>
                                        ) : (
                                            <>
                                                <Zap size={16} fill="white" />
                                                CAPTURE CLIP
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {activeTab === 'format' && (
                            <motion.div
                                key="format"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="yrd-tab-view"
                            >
                                <div className="yrd-format-options">
                                    <div className="yrd-format-card active">
                                        <b>WebM</b>
                                        <span>Standard Original</span>
                                    </div>
                                    <div className="yrd-format-card locked">
                                        <div className="yrd-format-row">
                                            <b>MP4 HD</b>
                                            <span className="yrd-coming-soon">Coming Soon</span>
                                        </div>
                                        <span>Standard Original</span>
                                    </div>
                                    <div className="yrd-format-card locked">
                                        <div className="yrd-format-row">
                                            <b>MP3 Audio</b>
                                            <span className="yrd-coming-soon">Coming Soon</span>
                                        </div>
                                        <span>Standard Original</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                </div>

            </motion.div>
        </div>
    );
};

export default App;
