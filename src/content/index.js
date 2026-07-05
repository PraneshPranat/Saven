// src/content/index.js

// 🔒 Guard: Prevents double-injection if the user clicks the icon twice
if (window.__SAVEN_LOADED__) {
  console.log("🟡 Saven: Already running on this page");
  throw new Error("Saven already injected");
}
window.__SAVEN_LOADED__ = true;

console.log("🟢 Saven: Content script injected successfully");
console.log("📍 Running on:", window.location.href);
