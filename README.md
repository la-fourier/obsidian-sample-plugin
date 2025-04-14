# ✨ Condensed Sparkles
OCR-powered Markdown annotation for academic PDFs – even LaTeX formulas from screenshots!

Condensed Sparkles is a powerful Obsidian plugin that extracts structured text (including LaTeX equations) from PDF screenshots using OCR, connects them to your notes, and helps you build semantic outlines from papers in seconds.

## 🚀 Features
🔍 Optical Character Recognition (OCR)
Extract text directly from images and screenshots using tesseract.js

Supports mathematical notation and basic LaTeX (custom replacements planned)

Fast, lightweight, and works seamlessly with PDF++

## 🪄 Automatic Environment Detection
Recognizes mathematical environments like:
Theorem, Definition, Lemma, Proposition, Corollary, Conjecture

Automatically wraps extracted content with Obsidian Admonitions:

shell
Kopieren
Bearbeiten
>[!theorem]
> Let n ∈ ℕ. Then the following holds...
If no recognized keyword is found, defaults to info.

🧷 Clipboard Integration & Live Watch
Listens for new PDF++ clipboard links (image + location in PDF)

Triggers OCR flow once a screenshot is copied

Automatically renames the screenshot using location info (page + coordinates)

Keeps your media organized and searchable

📝 Semantic Annotation of PDFs
Annotates your custom outline files (*-outline.md)

Adds tags and quotes from screenshots to the outline

Opens a modal for review and editing before inserting

Example modal preview (text-based):

less
Kopieren
Bearbeiten
┌────────────────────────────────────────────┐
│ 📎 Link detected: [[math-paper.pdf#page=3]]│
│                                            │
│ 🏷️ Tag: (12)                               │
│                                            │
│ >[!definition]                             │
│ > A prime number is a natural number ...   │
│                                            │
│ [Submit]   [Cancel]                        │
└────────────────────────────────────────────┘
🧠 Ideal Use Case
Condensed Sparkles is perfect for:

Researchers reading PDFs

Mathematicians or scientists annotating equations

Students building structured notes from papers

Anyone using PDF++

🛠 Settings (WIP)
Current:

🔐 Hidden field example (secret input)

Coming soon:

📂 Custom folder paths (PDFs, screenshots, outlines)

🏷️ Custom naming templates for screenshot renaming

🧩 Advanced LaTeX replacement engine

🧭 Typical Workflow
🎓 Example: You’re reading a math paper and want to capture a theorem from page 3.

🖼️ Take a screenshot using PDF++

📋 The image + link is copied to clipboard

✨ Click the Condensed Sparkles ribbon icon

⏳ The plugin detects the link, performs OCR

🧠 The environment (e.g. "Theorem") is detected

📝 A modal appears, showing the result

🪄 You submit – it appends the content to the corresponding outline file

📁 Screenshot is renamed to reflect PDF location

⚙️ Behind the Scenes
Uses tesseract.js for OCR

Clipboard is watched in intervals (500ms)

Modal dialog enables review & editing

Screenshot renaming logic based on page/position from PDF++ metadata

Environment parsing uses simple heuristics (keyword detection)

📦 File Structure (Example)
css
Kopieren
Bearbeiten
📁 PDFs/
   └─ math-paper.pdf
📁 lit-outline/
   └─ math-paper-outline.md
📁 screenshots/
   └─ theorem.page_3_213-450.png
📈 Future Ideas
📚 BibTeX / Zotero integration

🌍 Multi-language OCR support

🔁 Auto-sync of annotations

📌 Tag suggestion with AI

📐 Better LaTeX parsing and rendering

🤖 Developer Notes
Class names, settings, and logic have been modularized for future scalability. Currently written in TypeScript using the Obsidian API. To rename the plugin:

Change class MyPlugin to CondensedSparklesPlugin

Update manifest.json with new name, ID, description

Refactor SampleSettingTab → CondensedSparklesSettingTab

💬 Feedback / Issues
Feel free to open issues or feature requests on GitHub – contributions welcome!
Let Condensed Sparkles ✨ light up your research notes.



## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api
