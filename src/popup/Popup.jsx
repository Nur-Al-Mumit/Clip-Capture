import React from 'react';
import { Settings, ShieldCheck, Crown, ExternalLink, Mail, MessageSquare } from 'lucide-react';
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
                        <div className="logo">✨</div>
                        <h1>Pure Capture Pro</h1>
                    </div>
                    <span className="badge">v6.0</span>
                </header>

                <div className="status-banner">
                    <ShieldCheck size={16} color="#2ed573" />
                    <span>Engine Active & Protected</span>
                </div>

                <div className="menu-sections">
                    <div className="pro-card">
                        <div className="pro-text">
                            <h3>Unlock Unlimited</h3>
                            <p>Remove 15s limit & get MP4 HD</p>
                        </div>
                        <Crown size={24} className="crown-icon" />
                    </div>

                    <nav className="menu-links">
                        <div className="menu-item">
                            <Settings size={18} />
                            <span>Preferences</span>
                        </div>
                        <div className="menu-item">
                            <History size={18} />
                            <span>My History</span>
                        </div>
                        <div className="menu-item">
                            <MessageSquare size={18} />
                            <span>Support</span>
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
