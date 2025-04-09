import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, SettingTab } from 'obsidian';
import { chdir } from 'process';

// Remember to rename these classes and interfaces!

import { createWorker, ImageLike } from 'tesseract.js';

/**
 * Funktion zur Texterkennung mit Tesseract.js
 * @param imagePath Pfad zum Bild (Screenshot mit Formel)
 * @returns Erkannter Text und Formeln als Promise
 */
async function extractTextFromImage(imagePath: string, lang = 'eng'): Promise<{ text: string }> {
	try {
		const worker = await createWorker(lang);
		const ret = await worker.recognize(imagePath);
		console.log(ret.data.text);
		await worker.terminate();

		return { text: ret.data.text };
	} catch (error) {
		console.error('Fehler bei der Texterkennung:', error);
		throw error;
	}
}

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	lit_link: boolean;
	ribbon_lit_link: HTMLElement;

	async onload() {
		await this.loadSettings();
		this.lit_link = false;

		this.ribbon_lit_link = this.addRibbonIcon('droplets', 'Lit Link', async (evt: MouseEvent) => {
			this.lit_link = !this.lit_link;
			if (this.lit_link) {
				this.ribbon_lit_link?.classList.add("is-active");
			} else {
				this.ribbon_lit_link?.classList.remove("is-active");
			}
			while (this.lit_link) {
				const initialClipboard = await navigator.clipboard.readText();
				let newClipboard = initialClipboard;

				// console.log("Warte auf Änderungen im Clipboard...");
				while (newClipboard === initialClipboard && this.lit_link) {
					await new Promise(resolve => setTimeout(resolve, 400));
					newClipboard = await navigator.clipboard.readText();
				}
				await this.link_literature(newClipboard);
			}
			console.log(`lit link beendet`);
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	async onload_() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('pencil', 'Lit Link', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
			const fs = require('fs');
			const path = 'orga/forms/task.md';

			fs.appendFile(this.app.vault.getFileByPath(path)!.toString(), '\nHallo!', (err: Error) => {
				if (err) {
					console.error('Fehler beim Anhängen an die Datei:', err);
				} else {
					console.log('"Hallo!" wurde erfolgreich angehängt.');
				}
			});

		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		this.addCommand({
			id: 'lit-link-worflow',
			name: 'link literature',
			editorCallback: () => this.watchClipboardAndSave(),
			// write to outline
			// replace img name
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	link_literature(clipboard: string) {
		let active = this.app.workspace.getActiveFile()!;

		const file = this.app.vault.getFileByPath(active.path.replace(".md", "-outline.md"))!;

		this.app.vault.append(file, clipboard);

		// Dialog, Bilderkennung
		new SampleModal(this.app).open();

		this.waitForFocusChange();
	}

	async watchClipboardAndSave() {
		const initialClipboard = await navigator.clipboard.readText();
		let newClipboard = initialClipboard;

		// console.log("Warte auf Änderungen im Clipboard...");
		while (newClipboard === initialClipboard) {
			await new Promise(resolve => setTimeout(resolve, 400));
			newClipboard = await navigator.clipboard.readText();
		}


		let active = this.app.workspace.getActiveFile()!;

		console.log(active.basename, active.name, active.path);

		const fileName = `/${active.path}-outline.md`;
		const filePath = `/${fileName}`;
		await this.app.vault.create(filePath, newClipboard);

		// this.app.fileManager.renameFile();

		console.log(`Inhalt gespeichert in: ${filePath}`);

		console.log("Warte auf Fensterwechsel...");
		await this.waitForFocusChange();
		console.log(`Fenster gewechselt. Datei: ${filePath}`);
	}

	waitForFocusChange(): Promise<void> {
		return new Promise(resolve => {
			const handleFocus = () => {
				window.removeEventListener("blur", handleFocus);
				resolve();
			};
			window.addEventListener("blur", handleFocus);
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle("Environment suggestion");

		let name = '';
		new Setting(this.contentEl)
			.setName('Name')
			.addText((text) =>
				text.onChange((value) => {
					name = value;
				}));

		new Setting(this.contentEl)
				.setName("test");

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Submit')
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit(name);
					}));

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Cancel')
					.setCta()
					.onClick(() => { this.close(); }));
	}

	onSubmit(name: string) {

	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		// Setting für lit folder
		// Setting für outline folder
		// ggf template für name, sonst halt unsauber gecoded
		// ggf Ordner für Screenshots
		// ggf template für Screenshotbenennung
	}
}
