// src/popup/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup.jsx";
import "../../index.css"; // Brings in your Tailwind setup

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
