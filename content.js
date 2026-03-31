function injectDownloader() {
  if (document.getElementById('yt-range-downloader-panel')) return;

  const sidebar = document.querySelector('#secondary-inner') ||
    document.querySelector('#secondary') ||
    document.querySelector('#items.ytd-watch-next-secondary-results-renderer');

  if (!sidebar) return;

  // Function to get the most current title
  const getUpToDateTitle = () => {
    let title = document.querySelector('ytd-watch-metadata h1')?.innerText ||
      document.querySelector('h1.ytd-watch-metadata')?.innerText ||
      document.querySelector('.ytd-video-primary-info-renderer h1')?.innerText ||
      document.querySelector('h1.title.ytd-video-primary-info-renderer')?.innerText ||
      document.querySelector('yt-formatted-string.ytd-watch-metadata')?.innerText ||
      document.querySelector('meta[property="og:title"]')?.content ||
      document.title.replace(/ - YouTube$/, "").trim();

    // Final check to ignore generic "YouTube" word
    return title && title !== "YouTube" ? title : "Video";
  };

  const videoTitle = getUpToDateTitle();

  const panel = document.createElement('div');
  panel.id = 'yt-range-downloader-panel';
  panel.innerHTML = `
    <div class="yrd-container">
      <div class="yrd-header">
        <div class="yrd-title">
          <span class="yrd-icon-sparkle">🎬</span>
          <span class="yrd-video-title">${videoTitle}</span>
          <span class="yrd-version">v6.0</span>
        </div>
      </div>
      
      <div class="yrd-content">
        <div class="yrd-input-group">
          <label>START TIME</label>
          <div class="yrd-input-wrapper">
            <input type="text" id="yrd-start" value="0:00" placeholder="0:00">
            <button id="yrd-set-start" class="yrd-btn-set" title="Set to current time">SET</button>
          </div>
        </div>

        <div class="yrd-input-group">
          <label>END TIME</label>
          <div class="yrd-input-wrapper">
            <input type="text" id="yrd-end" value="1:00" placeholder="1:00">
            <button id="yrd-set-end" class="yrd-btn-set" title="Set to current time">SET</button>
          </div>
        </div>

        <button id="yrd-btn-capture" class="yrd-btn-primary">
          <span class="yrd-record-dot"></span>
          CAPTURE & SAVE CLIP
        </button>
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

    // Get freshest title at the moment of download
    const currentTitle = getUpToDateTitle();

    // Start local capture
    btn.classList.add('recording');
    btn.innerHTML = `<span class="yrd-record-dot pulsed"></span> RECORDING...`;

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
      const cleanTitle = currentTitle.replace(/[\\/:"*?<>|]/g, "");
      a.href = url;
      a.download = `${cleanTitle}-${s}-${e}.webm`;
      a.click();

      btn.classList.remove('recording');
      btn.innerHTML = `<span class="yrd-record-dot"></span> CAPTURE & SAVE CLIP`;
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
