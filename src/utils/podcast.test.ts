import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLatestEpisode } from './podcast';
import Parser from 'rss-parser';

// Mock rss-parser
vi.mock('rss-parser');

describe('getLatestEpisode', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return the latest episode when feed is valid', async () => {
        // Setup mock return value
        const mockFeed = {
            items: [
                {
                    title: 'Test Episode',
                    enclosure: { url: 'https://example.com/audio.mp3' },
                    link: 'https://example.com/episode',
                },
                {
                    title: 'Older Episode',
                }
            ],
        };

        // @ts-ignore - Mocking the class instance
        Parser.prototype.parseURL = vi.fn().mockResolvedValue(mockFeed);

        const result = await getLatestEpisode();

        expect(result).toEqual({
            title: 'Test Episode',
            audioUrl: 'https://example.com/audio.mp3',
            link: 'https://example.com/episode',
        });
    });

    it('should return null when feed has no items', async () => {
        const mockFeed = { items: [] };
        // @ts-ignore
        Parser.prototype.parseURL = vi.fn().mockResolvedValue(mockFeed);

        const result = await getLatestEpisode();

        expect(result).toBeNull();
    });

    it('should return null when parser throws an error', async () => {
        // @ts-ignore
        Parser.prototype.parseURL = vi.fn().mockRejectedValue(new Error('Network error'));

        const result = await getLatestEpisode();

        expect(result).toBeNull();
    });
});
