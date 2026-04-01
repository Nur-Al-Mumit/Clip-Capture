import React from 'react';
import { Settings, ShieldCheck, History, ExternalLink, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Popup = () => {
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

                <div className="status-banner">
                    <ShieldCheck size={16} color="#2ed573" />
                    <span>Engine Active & Ready</span>
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
                    <div className="footer-links">
                        <ExternalLink size={12} />
                        <span>View Documentation</span>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default Popup;
