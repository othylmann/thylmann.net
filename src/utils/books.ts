import Parser from 'rss-parser';

export interface Book {
    id: string;
    title: string;
    author: string;
    rating: number;
    coverImage: string;
    link: string;
    readDate: string;
    shelves: string[];
    review?: string;
}

const parser = new Parser({
    customFields: {
        item: [
            ['book_id', 'bookId'],
            ['author_name', 'authorName'],
            ['user_rating', 'userRating'],
            ['book_medium_image_url', 'coverImage'],
            ['book_description', 'description'],
            ['user_read_at', 'userReadAt'],
            ['user_shelves', 'shelves'],
            ['user_review', 'userReview'],
        ],
    },
});

const GOODREADS_ID = '10277497';
const RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_ID}?shelf=read`;

export async function getReadingList(): Promise<Book[]> {
    try {
        const feed = await parser.parseURL(RSS_URL);

        return feed.items.map((item: any) => ({
            id: item.bookId || item.guid,
            title: item.title,
            author: item.authorName || 'Unknown Author',
            rating: parseInt(item.userRating) || 0,
            coverImage: item.coverImage || '',
            link: item.link,
            readDate: item.userReadAt || item.pubDate || '',
            shelves: item.shelves ? item.shelves.split(',').map((s: string) => s.trim()).filter((s: string) => s !== 'read') : [],
            review: (item.userReview && item.userReview.trim() !== '') ? item.userReview : undefined,
        }));
    } catch (error) {
        console.error('Error fetching Goodreads RSS:', error);
        return [];
    }
}
