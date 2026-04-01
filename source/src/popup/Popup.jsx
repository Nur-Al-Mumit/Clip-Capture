import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, ShieldAlert, History, ExternalLink, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Popup = () => {
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        // Load the initial state
        chrome.storage.local.get(['extensionEnabled'], (result) => {
            if (result.extensionEnabled !== undefined) {
                setIsEnabled(result.extensionEnabled);
            }
        });
    }, []);

    const toggleExtension = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        chrome.storage.local.set({ extensionEnabled: newState });
    };

    return (
        <div className="popup-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="popup-inner"
            >
                <header className="popup-header">
                    <div className="brand">
                        <div className="logo">🎬</div>
                        <h1>Clip Capture</h1>
                    </div>
                    <span className="badge">V1.0</span>
                </header>

                <div className={`status-banner ${isEnabled ? 'enabled' : 'disabled'}`}>
                    <div className="status-info">
                        {isEnabled ? (
                            <ShieldCheck size={16} color="#2ed573" />
                        ) : (
                            <ShieldAlert size={16} color="#ff4757" />
                        )}
                        <span>{isEnabled ? 'Engine Active' : 'Engine Paused'}</span>
                    </div>

                    <button
                        className={`toggle-switch ${isEnabled ? 'on' : 'off'}`}
                        onClick={toggleExtension}
                        aria-label="Toggle Extension"
                    >
                        <motion.div
                            className="switch-handle"
                            animate={{ x: isEnabled ? 18 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>

                <div className="menu-sections">
                    <nav className="menu-links">
                        <div className="menu-item disabled">
                            <div className="menu-item-left">
                                <Settings size={18} />
                                <span>Preferences</span>
                            </div>
                            <span className="coming-soon">Coming Soon</span>
                        </div>
                        <div className="menu-item disabled">
                            <div className="menu-item-left">
                                <History size={18} />
                                <span>My History</span>
                            </div>
                            <span className="coming-soon">Coming Soon</span>
                        </div>
                        <div className="menu-item disabled">
                            <div className="menu-item-left">
                                <MessageSquare size={18} />
                                <span>Support</span>
                            </div>
                            <span className="coming-soon">Coming Soon</span>
                        </div>
                    </nav>
                </div>

                <footer className="popup-footer">
                    <p>Open YouTube to start capturing</p>
                    <div
                        className="footer-links"
                        onClick={() => window.open('https://github.com/Nur-Al-Mumit/Clip-Capture', '_blank')}
                        style={{ cursor: 'pointer' }}
                    >
                        <ExternalLink size={12} />
                        <span>View Documentation</span>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default Popup;
