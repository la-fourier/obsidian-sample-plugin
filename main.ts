import {
  App,
  Modal,
  Notice,
  Plugin,
  SuggestModal,
  TFile,
} from "obsidian";
import { spawnSync } from "child_process";

// import "../pdf-plus/main";
import * as Tesseract from "tesseract.js";

export default class CondensedSparkles extends Plugin {
  private lastClipboard: string = "";
  private lit_link: boolean;
  private ribbon_lit_link: HTMLElement;

  async onload() {
    // await this.loadSettings();
    this.lit_link = false;

    this.ribbon_lit_link = this.addRibbonIcon('droplets', 'Lit Link', async (evt: MouseEvent) => {
      this.lit_link = !this.lit_link;
      if (this.lit_link) {
        this.ribbon_lit_link?.classList.add("is-active");
      } else {
        this.ribbon_lit_link?.classList.remove("is-active");
      }
    });

    console.log("✨ Condensed Sparkles loaded");

    // Check clipboard every 1s
    this.lastClipboard = await navigator.clipboard.readText();
    this.registerInterval(window.setInterval(() => this.checkClipboard(), 1000));

    this.addCommand({
      id: 'lit-link-flow',
      name: 'Link literature',
      callback: async () => {
        const clpbd = await navigator.clipboard.readText()!;
        this.handleClipboard(clpbd);
      }
    });
  }

  onunload() {
    console.log("🧹 Condensed Sparkles unloaded");
  }

  async checkClipboard() {
    if (this.lit_link) {
      // const content = clipboardy.readSync();
      const content = await navigator.clipboard.readText();
      if (content === this.lastClipboard || !this.isValidContent(content)) return;

      this.lastClipboard = content;
      console.log("📋 Neue strukturierte Zwischenablage erkannt");
      await this.handleClipboard(content);
    }
  }

  isValidContent(content: string): boolean {
    return content.includes("![[assets/") && content.includes(".jpg]]") &&
      content.includes("pdf#page=") && content.includes("&rect=");
  }

  async handleClipboard(content: string) {
    const vaultRoot = "D:/DATA/v4build/projekte/zettelkasten/";

    const imgMatch = content.match(/!\[\[assets\/(.+?)\.jpg\]\]/);
    const linkMatch = content.match(/\[\[([a-zA-Z0-9_-]+)\.pdf#page=(\d+)&rect=([\d,]+)\|/);

    if (!imgMatch || !linkMatch) {
      new Notice("❌ Ungültige Zwischenablage-Struktur.");
      return;
    }

    const imgName = imgMatch[1] + ".jpg";
    const [bookSlug, page, rectStr] = [linkMatch[1], linkMatch[2], linkMatch[3]];
    const rectSafe = rectStr.replace(/,/g, "-");
    const newImgName = `${bookSlug}__p${page}__rect-${rectSafe}.jpg`;

    const oldImgPath = `assets/${imgName}`;
    const newImgPath = `assets/${bookSlug}/${newImgName}`;

    const imgFile = await this.app.vault.getAbstractFileByPath(oldImgPath) as TFile;

    // Erstelle Zielordner, falls nicht vorhanden
    const targetFolder = `assets/${bookSlug}`;
    if (!this.app.vault.getAbstractFileByPath(targetFolder)) {
      await this.app.vault.createFolder(targetFolder);
    }

    // Verschiebe und benenne Screenshot um
    await this.app.vault.rename(imgFile, newImgPath);

    // OCR mit Tesseract
    const absoluteImgPath = vaultRoot + newImgPath;
    const txtOutputPath = absoluteImgPath.replace(/\.jpg$/, ".txt");

    // const tesseractResult = await Tesseract.recognize(absoluteImgPath, "eng");

    console.log('tesseract "' + absoluteImgPath + '" "' + txtOutputPath + '" -l eng');

    const tesseractResult = await spawnSync('tesseract "' + absoluteImgPath + '" "' + txtOutputPath + '" -l eng');

    console.log(tesseractResult, tesseractResult.status, tesseractResult.stdout);

    if (tesseractResult.status !== 0) {
      new Notice("❌ OCR mit Tesseract fehlgeschlagen.");
      // console.error(tesseractResult.stderr?.toString());
      return;
    }

    // Lese OCR-Ergebnis (über Vault)
    const txtVaultPath = newImgPath.replace(/\.jpg$/, ".txt");
    const txtFile = this.app.vault.getAbstractFileByPath(txtVaultPath) as TFile;

    if (!txtFile) {
      new Notice("❌ Konnte OCR-Ergebnis nicht finden.");
      return;
    }

    const ocrText = await this.app.vault.read(txtFile);

    // const ocrText = tesseractResult.data.text;

    // Zeige OCR-Popup zur Bearbeitung
    new OcrEditModal(this.app, ocrText, async (editedText) => {
      // clipboardy.writeSync(editedText);
      navigator.clipboard.writeText(editedText);
      new Notice("📎 Text in Zwischenablage gespeichert.");

      // Füge Callout in Outline ein
      const outlineFilePath = `lit-outline/${bookSlug}-outline.md`;
      const outlineFile = this.app.vault.getAbstractFileByPath(outlineFilePath) as TFile;

      if (!outlineFile) {
        new Notice("⚠️ Outline-Datei nicht gefunden.");
        return;
      }

      const imgLink = `![[assets/${bookSlug}/${newImgName}]]`;
      const pdfLink = `[[${bookSlug}.pdf#page=${page}&rect=${rectStr}|Quelle]]`;
      const snippet = editedText.split("\n").slice(0, 2).join(" ");

      const callout = [
        `> [!ocr] Automatischer OCR-Ausschnitt`,
        `> ${imgLink}`,
        `> ${pdfLink}`,
        `> 📝 Vorschau: ${snippet.trim()}...`
      ].join("\n");

      const currentContent = await this.app.vault.read(outlineFile);
      await this.app.vault.modify(outlineFile, `${currentContent.trim()}\n\n${callout}\n`);
      new Notice("📝 Outline aktualisiert.");
    }).open();

    // add to clipboard
    // navigator.clipboard.
    // delete old link from outline, write new stuff -> report!
  }

  // async loadSettings() {
  // 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  // }

  // async saveSettings() {
  // 	await this.saveData(this.settings);
  // }
}

// class ScreenshotModal extends SuggestModal<TFile> {
//   getSuggestions(query: string, app: App): TFile[] | Promise<TFile[]> {
    
//   }
// }

class OcrEditModal extends Modal {
  constructor(app: App, private text: string, private onSave: (edited: string) => void) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "✍️ OCR-Ergebnis bearbeiten" });

    const textarea = contentEl.createEl("textarea", {
      text: this.text,
    });
    textarea.style.width = "100%";
    textarea.style.height = "300px";
    textarea.style.marginBottom = "1em";

    const saveBtn = contentEl.createEl("button", { text: "✅ Speichern & übernehmen" });
    saveBtn.onclick = () => {
      this.onSave(textarea.value);
      this.close();
    };
  }

  onClose() {
    this.contentEl.empty();
  }
}
