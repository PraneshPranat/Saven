import React from "react";
import { useState, useEffect } from "react";
const Popup = () => {
  const [hostname, setHostname] = useState("");
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    //this will fetch the current tab hostname for the first time when the popup is opened and set the isActive state accordingly

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0] && tabs[0].url) {
        // Parse the URL string into an object
        const urlObj = new URL(tabs[0].url);

        // Extract the hostname (e.g., "example.com")
        const hn = urlObj.hostname;
        setHostname(hn);
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
      <div className="flex gap-5">
        <span>
          <img src="" alt="#" />
        </span>
        <p className="text-xl text-cyan-700 ">Saven</p>
      </div>

      <div className="flex justify-center mt-10 mb-4">
        <p className="text-xl text-cyan-500">
          {isActive ? "Optimise AI tokens" : "AI tokens optimiser is ON"}
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
        <p className="text-xl text-cyan-500">
          {isActive ? (
            <>
              {" "}
              working on <span className="text-emerald-500"> {hostname} </span>
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
