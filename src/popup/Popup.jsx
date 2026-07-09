import React from "react";
import { useState, useEffect } from "react";
const Popup = () => {
  const [hostname, setHostname] = useState("");
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        const urlObj = new URL(tabs[0].url);
        const hn = urlObj.hostname;

        setHostname(hn);

        const autoSites = [
          "chat.openai.com",
          "chatgpt.com",
          "claude.ai",
          "gemini.google.com",
        ];
        if (autoSites.includes(hn)) {
          setActive(true); // ✅ Runs with the real hostname
        }
      }
    });
  }, []);

  useEffect(() => {
    // this will send message to the background index.js to toggle content script.js
  }, [isActive]);

  const toggle = () => {
    setActive(!isActive);
  };
  return (
    <div>
      <div className="flex  gap-5">
        <span>
          <img
            className="w-10 h-10 rounded-full object-cover shadow-sm"
            src="/saven.svg"
            alt="#"
          />
        </span>
        <p className="text-2xl mt-1 font-bold text-cyan-700 ">Saven</p>
      </div>

      <div className="flex justify-center mt-10 mb-4">
        <p className="text-xl text-cyan-500">
          {!isActive ? "Optimise AI tokens" : "AI tokens optimiser is ON"}
        </p>
      </div>
      <div className=" mx-auto h-20 bg-cyan-900 rounded-lg flex flex-col justify-center items-center">
        <button
          className=" w-[90%] text-xl rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 focus:outline-none focus:shadow-outline"
          onClick={toggle}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
      </div>
      <div className="mt-8">
        <p className="text-xl  text-cyan-500">
          {isActive ? (
            <>
              <span className="text-[16px]">working on : </span>
              <span className=" px-3 text-emerald-500"> {hostname} </span>
            </>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default Popup;
