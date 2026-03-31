// v4.2 Offscreen Script (The Ghost User)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "OFFSCREEN_START") {
      startOffscreenFlow(request.data);
      return true;
  }
});

async function startOffscreenFlow(data) {
  const { url, s, e, f } = data;
  
  try {
    // Stage 1: Request the clip (This happens from a Window context now - much more stable!)
    const initUrl = `https://loader.to/api/ajax/download.php?url=${encodeURIComponent(url)}&f=${f}&s=${s}&e=${e}`;
    const res = await fetch(initUrl);
    const text = await res.text();
    
    const initData = JSON.parse(text);
    if (!initData.id) throw new Error("Processing failed");
    
    // Stage 2: Poll for completion
    pollStatus(initData.id);
    
  } catch (err) {
    console.error("Offscreen Flow Error:", err);
    // If it fails with 1080p, we try the 720p fallback automatically
    if (f !== "720") {
        startOffscreenFlow({ ...data, f: "720" });
    }
  }
}

async function pollStatus(id) {
  try {
    const checkUrl = `https://loader.to/api/ajax/check.php?id=${id}`;
    const res = await fetch(checkUrl);
    const data = await res.json();
    
    if (data.url && data.url !== "") {
        // SUCCESS: Message the background to trigger the download
        chrome.runtime.sendMessage({ type: "TRIGGER_DOWNLOAD", url: data.url });
    } else if (data.progress < 1000) {
        setTimeout(() => pollStatus(id), 2000);
    }
  } catch (err) {
    console.error("Poll Status Error:", err);
  }
}
