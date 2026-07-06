import { useState, useEffect } from "react";

export default function Popup() {
  const [currentHost, setCurrentHost] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // 1. Read current tab
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.url) {
        const host = new URL(tab.url).hostname;
        setCurrentHost(host);

        // Auto-activate on Big 4
        const autoSites = [
          "chat.openai.com",
          "chatgpt.com",
          "claude.ai",
          "gemini.google.com",
        ];
        if (autoSites.some((s) => host.includes(s))) {
          setIsActive(true);
        }
      }
    });

    // 2. Listen for confirmation from background/content
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "INJECTION_SUCCESS" || msg.action === "SAVEN_LOADED") {
        setIsActive(true);
      }
    });
  }, []);

    const activateScript = async () => {
      try {
        // 1. Explicitly get the active tab ID
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab?.id) throw new Error("No active tab found");

        // 2. Pass tabId directly in the message
        const res = await chrome.runtime.sendMessage({
          action: "INJECT_SCRIPT",
          tabId: tab.id,
        });

        if (res?.success) setIsActive(true);
        else throw new Error(res?.error || "Unknown error");
      } catch (err) {
        console.error("❌ Activation failed:", err);
        alert(`Saven Error: ${err.message}`);
      }
    };

  return (
    <div className="w-80 bg-gray-900 text-white p-4 space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
        <span className="text-2xl">🪙</span>
        <div>
          <h1 className="text-lg font-bold leading-none">Saven</h1>
          <p className="text-xs text-gray-400">AI Token Optimizer</p>
        </div>
      </div>

      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm">
        <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
          Target Site
        </p>
        <p className="font-mono text-blue-400 truncate">
          {currentHost || "Loading..."}
        </p>
      </div>

      {isActive ? (
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium bg-green-900/20 p-2 rounded border border-green-900/50">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Saven is Active
        </div>
      ) : (
        <button
          onClick={activateScript}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-blue-900/20"
        >
          Activate on this site
        </button>
      )}
    </div>
  );
}
