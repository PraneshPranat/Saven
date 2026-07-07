if (window.__SAVEN_LOADED__) {
  console.log("🟡 Saven: Already running on this page");
  throw new Error("Saven already injected");
}
window.__SAVEN_LOADED__ = true;

console.log("🟢 Saven: Content script injected successfully");
console.log("📍 Running on:", window.location.href);


// here we will write all the logic for the content script, like adding event listeners, manipulating the DOM, etc.