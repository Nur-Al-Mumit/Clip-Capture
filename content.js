function injectDownloader() {
  if (document.getElementById('yt-range-downloader-panel')) return;

  const sidebar = document.querySelector('#secondary-inner') || 
                  document.querySelector('#secondary') || 
                  document.querySelector('#items.ytd-watch-next-secondary-results-renderer');

  if (!sidebar) return;

  const panel = document.createElement('div');
  panel.id = 'yt-range-downloader-panel';
  panel.innerHTML = `
    <div class="yrd-header" style="color: #000; font-weight: bold; border-bottom: 2px solid #333; padding: 10px;">
      PURE CAPTURE ENGINE <span style="font-size:10px; float:right; opacity:0.5;">v6.0</span>
    </div>
    <div class="yrd-body" style="padding-top:15px; background: #fff; border-radius: 0 0 10px 10px; padding: 15px;">
      <div class="yrd-row" style="display:flex; gap:5px; margin-bottom:10px;">
        <input type="text" id="yrd-start" value="0:00" style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px;">
        <button id="yrd-set-start" style="padding:8px; background:#eee; border:1px solid #ccc; border-radius:4px; font-size:12px;">SET</button>
      </div>
      <div class="yrd-row" style="display:flex; gap:5px; margin-bottom:15px;">
        <input type="text" id="yrd-end" value="1:00" style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px;">
        <button id="yrd-set-end" style="padding:8px; background:#eee; border:1px solid #ccc; border-radius:4px; font-size:12px;">SET</button>
      </div>
      <button id="yrd-btn-capture" style="width:100%; padding:15px; background:#cc0000; color:white; border:none; border-radius:8px; font-weight:bold; font-size:16px; cursor:pointer;">
        🔴 CAPTURE & SAVE CLIP
      </button>
      <div id="yrd-status" style="font-size:10px; margin-top:10px; color:#555; text-align:center;">
        No servers. Pure local capture.
      </div>
    </div>
  `;

  sidebar.prepend(panel);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    let ret = "";
    if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  const parseTime = (timeStr) => {
    const parts = timeStr.trim().split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0] || 0;
  };

  document.getElementById('yrd-btn-capture').onclick = () => {
    const s = parseTime(document.getElementById('yrd-start').value);
    const e = parseTime(document.getElementById('yrd-end').value);
    const video = document.querySelector('video.html5-main-video');
    const btn = document.getElementById('yrd-btn-capture');
    
    if (e <= s) return alert("End must be after Start!");
    if (e - s > 300) return alert("Max recording is 5 minutes for stability.");

    // Start local capture
    btn.innerText = "RECORDING CLİP...";
    btn.style.background = "#555";
    
    // 1. Jump to start time
    video.currentTime = s;
    video.play();
    
    // 2. Setup the Stream Capture (Custom Code)
    const stream = video.captureStream();
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];
    
    mediaRecorder.ondataavailable = (ev) => { if (ev.data.size > 0) chunks.push(ev.data); };
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yt-clip-${s}-${e}.webm`;
        a.click();
        
        btn.innerText = "🔴 CAPTURE & SAVE CLIP";
        btn.style.background = "#cc0000";
    };

    mediaRecorder.start();
    
    // 3. Stop after the range length
    const duration = (e - s) * 1000;
    setTimeout(() => {
        mediaRecorder.stop();
        video.pause();
    }, duration);
  };

  document.getElementById('yrd-set-start').onclick = () => { if (document.querySelector('video')) document.getElementById('yrd-start').value = formatTime(document.querySelector('video').currentTime); };
  document.getElementById('yrd-set-end').onclick = () => { if (document.querySelector('video')) document.getElementById('yrd-end').value = formatTime(document.querySelector('video').currentTime); };
}

window.addEventListener('yt-navigate-finish', injectDownloader);
const obs = new MutationObserver(injectDownloader);
obs.observe(document.body, { childList: true, subtree: true });
injectDownloader();
