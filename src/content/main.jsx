import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './content.css';

const injectReactApp = () => {
    if (document.getElementById('pure-capture-pro-root')) return;

    const sidebar = document.querySelector('#secondary-inner') || 
                    document.querySelector('#secondary') || 
                    document.querySelector('#items.ytd-watch-next-secondary-results-renderer');

    if (!sidebar) return;

    const mountPoint = document.createElement('div');
    mountPoint.id = 'pure-capture-pro-root';
    sidebar.prepend(mountPoint);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

// Initial injection
injectReactApp();

// Handle SPA navigation
window.addEventListener('yt-navigate-finish', injectReactApp);
const observer = new MutationObserver(injectReactApp);
observer.observe(document.body, { childList: true, subtree: true });
