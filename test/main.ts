import { createWorker, ImageLike } from 'tesseract.js';

/**
 * Funktion zur Texterkennung mit Tesseract.js
 * @param imagePath Pfad zum Bild (Screenshot mit Formel)
 * @returns Erkannter Text und Formeln als Promise
 */
async function extractTextFromImage(imagePath: string): Promise<{ text: string }> {
    try {
        const worker = await createWorker('eng');
        const ret = await worker.recognize(imagePath);
        console.log(ret.data.text);
        await worker.terminate();

        return { text: ret.data.text };
    } catch (error) {
        console.error('Fehler bei der Texterkennung:', error);
        throw error;
    }
}

// Beispielaufruf mit einem Screenshot
console.log("ksjdf");
const imagePath = 'D://DATA//v4build//projekte//zettelkasten//assets//Pasted image 20250326192607.png'; // Pfad zum Bild anpassen
extractTextFromImage(imagePath)
    .then((result) => console.log('Erkannter Text:', result.text))
    .catch((err) => console.error(err));
