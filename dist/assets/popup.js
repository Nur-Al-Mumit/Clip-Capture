import{c as l,r as c,j as e,m as d,R as h,a as m}from"./proxy.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=l("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=l("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=l("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=l("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=l("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]),y=()=>{const[n,i]=c.useState(!0);c.useEffect(()=>{chrome.storage.local.get(["extensionEnabled"],t=>{t.extensionEnabled!==void 0&&i(t.extensionEnabled)})},[]);const o=()=>{const t=!n;i(t),chrome.storage.local.set({extensionEnabled:t})};return e.jsx("div",{className:"popup-container",children:e.jsxs(d.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"popup-inner",children:[e.jsxs("header",{className:"popup-header",children:[e.jsxs("div",{className:"brand",children:[e.jsx("div",{className:"logo",children:"🎬"}),e.jsx("h1",{children:"Clip Capture"})]}),e.jsx("span",{className:"badge",children:"V1.0"})]}),e.jsxs("div",{className:`status-banner ${n?"enabled":"disabled"}`,children:[e.jsxs("div",{className:"status-info",children:[n?e.jsx(g,{size:16,color:"#2ed573"}):e.jsx(j,{size:16,color:"#ff4757"}),e.jsx("span",{children:n?"Engine Active":"Engine Paused"})]}),e.jsx("button",{className:`toggle-switch ${n?"on":"off"}`,onClick:o,"aria-label":"Toggle Extension",children:e.jsx(d.div,{className:"switch-handle",animate:{x:n?18:0},transition:{type:"spring",stiffness:500,damping:30}})})]}),e.jsx("div",{className:"menu-sections",children:e.jsxs("nav",{className:"menu-links",children:[e.jsxs("div",{className:"menu-item disabled",children:[e.jsxs("div",{className:"menu-item-left",children:[e.jsx(f,{size:18}),e.jsx("span",{children:"Preferences"})]}),e.jsx("span",{className:"coming-soon",children:"Coming Soon"})]}),e.jsxs("div",{className:"menu-item disabled",children:[e.jsxs("div",{className:"menu-item-left",children:[e.jsx(u,{size:18}),e.jsx("span",{children:"My History"})]}),e.jsx("span",{className:"coming-soon",children:"Coming Soon"})]}),e.jsxs("div",{className:"menu-item disabled",children:[e.jsxs("div",{className:"menu-item-left",children:[e.jsx(x,{size:18}),e.jsx("span",{children:"Support"})]}),e.jsx("span",{className:"coming-soon",children:"Coming Soon"})]})]})}),e.jsxs("footer",{className:"popup-footer",children:[e.jsx("p",{children:"Open a video page to start capturing"}),e.jsxs("div",{className:"footer-links",onClick:()=>window.open("https://github.com/Nur-Al-Mumit/Clip-Capture","_blank"),style:{cursor:"pointer"},children:[e.jsx(p,{size:12}),e.jsx("span",{children:"View Documentation"})]})]})]})})};h.createRoot(document.getElementById("root")).render(e.jsx(m.StrictMode,{children:e.jsx(y,{})}));
