chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "INJECT_SCRIPT") {
    // ✅ Read tabId from the message payload instead of sender.tab
    const tabId = msg.tabId;

    if (!tabId) {
      sendResponse({ success: false, error: "No tab ID provided" });
      return;
    }

    chrome.scripting
      .executeScript({
        target: { tabId },
        files: ["src/content/index.js"],
      })
      .then(() => {
        chrome.action.setBadgeText({ tabId, text: "ON" });
        chrome.action.setBadgeBackgroundColor({ tabId, color: "#10b981" });
        sendResponse({ success: true });
      })
      .catch((err) => {
        console.error("❌ Background: Injection failed:", err);
        sendResponse({ success: false, error: err.message });
      });

    return true; // Required for async sendResponse
  }
});
