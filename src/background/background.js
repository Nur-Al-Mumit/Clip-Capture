// v5.2 Controller (Bypassing CSP)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PLAYER_DATA") {
      // Use the official Chrome scripting API to read the MAIN world
      chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          world: "MAIN",
          func: () => {
              return window.ytInitialPlayerResponse || (typeof ytplayer !== "undefined" ? ytplayer.config.args.player_response : null);
          }
      }, (results) => {
          if (results && results[0]) {
              sendResponse({ payload: results[0].result });
          } else {
              sendResponse({ error: "Could not access video data." });
          }
      });
      return true; // Keep channel open for async response
  }
});
