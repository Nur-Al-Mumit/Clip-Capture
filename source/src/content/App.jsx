import React, { useState, useEffect } from 'react';
import { Zap, Clapperboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
    const [startTime, setStartTime] = useState('0:00');
    const [endTime, setEndTime] = useState('1:00');
    const [isRecording, setIsRecording] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [format, setFormat] = useState('webm');

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

        // Check if MP4 is supported by the browser's MediaRecorder
        const isMp4Supported = MediaRecorder.isTypeSupported('video/mp4');
        const selectedMimeType = (format === 'mp4' && isMp4Supported) ? 'video/mp4' : 'video/webm; codecs=vp9';
        const fileExt = (format === 'mp4' && isMp4Supported) ? 'mp4' : 'webm';

        if (format === 'mp4' && !isMp4Supported) {
            alert("Direct MP4 recording is not supported in this browser. Recording as WebM instead.");
        }

        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: selectedMimeType
        });
        const chunks = [];

        mediaRecorder.ondataavailable = (ev) => {
            if (ev.data.size > 0) chunks.push(ev.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: selectedMimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const cleanTitle = videoTitle.replace(/[\\/:"*?<>|]/g, "").substring(0, 100);
            a.href = url;
            a.download = `${cleanTitle}-${startTime.replace(/:/g, '-')}-${endTime.replace(/:/g, '-')}.${fileExt}`;
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
                    <div className="yrd-body">
                        <div className="yrd-tab-view">
                            <div className="yrd-input-group" style={{ marginBottom: '16px' }}>
                                <label>FORMAT</label>
                                <div className="yrd-format-options">
                                    <div
                                        className={`yrd-format-card ${format === 'webm' ? 'active' : ''}`}
                                        onClick={() => setFormat('webm')}
                                        style={{ cursor: 'pointer', margin: 0 }}
                                    >
                                        <b>WebM</b>
                                        <span style={{ fontSize: '10px' }}>Standard</span>
                                    </div>
                                    <div
                                        className={`yrd-format-card ${format === 'mp4' ? 'active' : ''}`}
                                        onClick={() => setFormat('mp4')}
                                        style={{ cursor: 'pointer', margin: 0 }}
                                    >
                                        <b>MP4 HD</b>
                                        <span style={{ fontSize: '10px' }}>Supported</span>
                                    </div>
                                    <div
                                        className="yrd-format-card"
                                        style={{ cursor: 'not-allowed', margin: 0, opacity: 0.5 }}
                                    >
                                        <b>MP3</b>
                                        <span style={{ fontSize: '10px' }}>Coming soon</span>
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    </div>

                </div>

            </motion.div>
        </div>
    );
};

export default App;
