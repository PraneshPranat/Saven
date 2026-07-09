# 🪙 Saven

**Stop paying for AI fluff. Prune logs, stop the yapping, and rescue your context window.**

Saven is a lightweight, intelligent Chrome Extension designed for developers, AI agencies, and power users who want to optimize their LLM workflows. It sits silently between you and AI platforms (ChatGPT, Claude, Gemini), stripping out invisible junk, compressing massive inputs, and forcing the AI to output exactly what you need—saving you API tokens, premium rate-limits, and time.

---

## 🚨 The Problems
Modern AI development is plagued by hidden inefficiencies:
1. **The "Dump Truck" Effect:** Pasting 5,000 lines of server logs just to ask about one error wastes massive amounts of input tokens.
2. **The Output Premium:** LLMs waste expensive output tokens on conversational filler (*"Certainly! Here is the updated code..."*).
3. **The Snowball Effect:** Deep chat histories degrade AI intelligence and trigger rate limits, but manually summarizing and migrating chats breaks your workflow.
4. **The Invisible Tax:** Copy-pasting from Notion, Slack, or PDFs introduces hundreds of invisible non-breaking spaces and weird unicode characters that LLM tokenizers bill you for.

## ✨ The Solution: Saven's Core Features

### 1. 🧹 Smart Input Pruning (The Log Stripper)
When you paste a massive terminal log or codebase into the chat box, Saven intercepts it instantly. It uses local Regex to strip out thousands of lines of successful `INFO` logs and boilerplate, injecting *only* the critical `ERROR` stack trace into the prompt.
* **Result:** 5,000 lines shrinks to 50 lines. Massive reduction in input tokens.

### 2. 🤫 Output Structuring (Anti-Yap Mode)
Output tokens cost 3x to 5x more than input tokens. Saven allows you to inject strict system constraints on the fly (via keyboard shortcuts or UI buttons) that force the AI to output *only* the modified code or direct answers.
* **Result:** Eliminates conversational filler, markdown explanations, and pleasantries, slashing output token costs.

### 3. 🔄 Context Migration (The Snowball Fix)
When a chat gets too deep and the AI starts "forgetting" things, Saven prompts the LLM to generate a dense, technical summary of the current session. It automatically copies this summary to your clipboard and opens a fresh chat tab.
* **Result:** You migrate to a clean, 200-token context window in seconds without losing your technical progress.

### 4. 🧼 Invisible Tax Sanitizer
Saven runs a local minifier on your text inputs, collapsing redundant whitespace, stripping zero-width characters, and removing HTML artifacts before the text ever reaches the LLM's tokenizer.

### 5. 📊 Savings Dashboard & Prompt Macros
* **Dashboard:** Tracks characters and estimated tokens saved locally in your browser.
* **Macros:** Save and 1-click inject your favorite token-efficient prompts and constraints.

---

## 🛠️ Tech Stack

Saven is built with a modern, high-performance architecture:
* **UI / Dashboard:** React (JSX) + Tailwind CSS
* **Content Script (DOM Worker):** Vanilla JavaScript (Zero dependencies for maximum performance and compatibility with ProseMirror/Rich Text editors)
* **Build Tool:** Vite + `@crxjs/vite-plugin`
* **Architecture:** Manifest V3

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18 or higher)
* Google Chrome (or any Chromium-based browser)

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd saven-extension
npm install