import fs from 'node:fs';
import path from 'node:path';

interface Quote {
    text: string;
    author: string;
}

export function getRandomQuote(): Quote {
    const filePath = path.resolve(process.cwd(), 'src/data/quotes.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Split by lines and filter empty ones
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 10);

    // Choose a random line
    const randomLine = lines[Math.floor(Math.random() * lines.length)];

    // Parse "Quote text - Author"
    // Using lastIndexOf to handle quotes that might contain hyphens
    const lastHyphenIndex = randomLine.lastIndexOf(' - ');

    if (lastHyphenIndex === -1) {
        return {
            text: randomLine,
            author: "Unknown"
        };
    }

    const text = randomLine.substring(0, lastHyphenIndex).trim();
    const author = randomLine.substring(lastHyphenIndex + 3).trim();

    return { text, author };
}
