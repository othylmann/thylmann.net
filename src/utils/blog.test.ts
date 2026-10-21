import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLatestPosts, resetBlogCache } from './blog';
import Parser from 'rss-parser';

vi.mock('rss-parser');

describe('getLatestPosts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetBlogCache();
    });

    it('should map feed items to posts and apply the limit', async () => {
        const mockFeed = {
            items: [
                { title: ' First Post ', link: 'https://blog.thylmann.net/p/first', isoDate: '2026-08-18T08:02:22.000Z', contentSnippet: 'Subtitle one' },
                { title: 'Second Post', link: 'https://blog.thylmann.net/p/second', pubDate: 'Sat, 15 Aug 2026 08:00:00 GMT' },
                { title: 'Third Post', link: 'https://blog.thylmann.net/p/third' },
            ],
        };

        // @ts-ignore - Mocking the class instance
        Parser.prototype.parseURL = vi.fn().mockResolvedValue(mockFeed);

        const result = await getLatestPosts(2);

        expect(result).toEqual([
            { title: 'First Post', link: 'https://blog.thylmann.net/p/first', date: '2026-08-18T08:02:22.000Z', description: 'Subtitle one' },
            { title: 'Second Post', link: 'https://blog.thylmann.net/p/second', date: 'Sat, 15 Aug 2026 08:00:00 GMT', description: '' },
        ]);
    });

    it('should skip items without title or link', async () => {
        const mockFeed = { items: [{ title: 'No link' }, { link: 'https://blog.thylmann.net/p/x' }] };
        // @ts-ignore
        Parser.prototype.parseURL = vi.fn().mockResolvedValue(mockFeed);

        expect(await getLatestPosts()).toEqual([]);
    });

    it('should fetch the feed only once across calls', async () => {
        // @ts-ignore
        Parser.prototype.parseURL = vi.fn().mockResolvedValue({ items: [] });

        await getLatestPosts();
        await getLatestPosts(10);

        expect(Parser.prototype.parseURL).toHaveBeenCalledTimes(1);
    });

    it('should return an empty list when the parser throws', async () => {
        // @ts-ignore
        Parser.prototype.parseURL = vi.fn().mockRejectedValue(new Error('Network error'));

        expect(await getLatestPosts()).toEqual([]);
    });
});
