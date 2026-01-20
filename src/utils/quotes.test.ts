import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomQuote } from './quotes';
import fs from 'node:fs';

// Mock fs and path
vi.mock('node:fs');
vi.mock('node:path', async () => {
    const actual = await vi.importActual('node:path');
    return {
        ...actual,
        resolve: vi.fn().mockReturnValue('/mock/path/to/quotes.md'),
    };
});

describe('getRandomQuote', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return a valid quote when file contains correctly formatted lines', () => {
        const mockContent = `
Quote 1 - Author 1
Quote 2 - Author 2
    `; // Only lines > 10 chars are cleaned

        vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

        // Mock Math.random to return the first quote (index 0)
        // There are two non-empty lines > 10 chars
        // "Quote 1 - Author 1"
        // "Quote 2 - Author 2"
        vi.spyOn(Math, 'random').mockReturnValue(0);

        const result = getRandomQuote();

        expect(result).toEqual({
            text: 'Quote 1',
            author: 'Author 1',
        });
    });

    it('should return text with "Unknown" author when separator is missing', () => {
        const mockContent = `
This is a quote without author separator
    `;
        vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);
        vi.spyOn(Math, 'random').mockReturnValue(0);

        const result = getRandomQuote();

        expect(result).toEqual({
            text: 'This is a quote without author separator',
            author: 'Unknown',
        });
    });

    it('should filter out short lines', () => {
        // "Short" is < 10 chars, "Long enough quote - Author" is > 10
        const mockContent = `
Short
Long enough quote - Author
      `;
        vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);
        // Math.random() * 1 -> 0
        vi.spyOn(Math, 'random').mockReturnValue(0);

        const result = getRandomQuote();

        // Should pick the only valid line
        expect(result).toEqual({
            text: 'Long enough quote',
            author: 'Author'
        });
    });
});
