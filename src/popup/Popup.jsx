import { useState, useEffect } from "react";

export default function Popup() {
  const [currentHost, setCurrentHost] = useState("");

  useEffect(() => {
    
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.url) {
        setCurrentHost(new URL(tab.url).hostname);
      }
    });
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold flex items-center gap-2">
        <span>🪙</span> Saven
      </h1>
      <p className="text-gray-400 text-xs">AI Token Optimizer</p>

      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm">
        <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
          Active on
        </p>
        <p className="font-mono text-blue-400 truncate">
          {currentHost || "Loading..."}
        </p>
      </div>

      <div className="pt-2 border-t border-gray-800 text-xs text-gray-500">
        ✅ Extension pipeline working. Ready for features.
      </div>
    </div>
  );
}
