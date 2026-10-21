import Parser from 'rss-parser';

export const BLOG_URL = 'https://blog.thylmann.net';
export const BLOG_FEED_URL = `${BLOG_URL}/feed`;

export interface BlogPost {
  title: string;
  link: string;
  date: string;
  description: string;
}

// The home page and llms.txt both need the posts; fetch the feed once per build.
let cached: Promise<BlogPost[]> | undefined;

export function getLatestPosts(limit = 5): Promise<BlogPost[]> {
  cached ??= fetchPosts();
  return cached.then((posts) => posts.slice(0, limit));
}

export function resetBlogCache() {
  cached = undefined;
}

async function fetchPosts(): Promise<BlogPost[]> {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL(BLOG_FEED_URL);

    return (feed.items || [])
      .filter((item) => item.title && item.link)
      .map((item) => ({
        title: item.title!.trim(),
        link: item.link!,
        date: item.isoDate || item.pubDate || '',
        // Substack puts the post subtitle in <description>; rss-parser decodes it into contentSnippet
        description: item.contentSnippet?.trim() || '',
      }));
  } catch (error) {
    console.error('Error fetching blog feed:', error);
    return [];
  }
}
