import Parser from 'rss-parser';

interface PodcastEpisode {
  title: string;
  audioUrl: string;
  link: string;
}

export async function getLatestEpisode(): Promise<PodcastEpisode | null> {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL('https://api.riverside.com/hosting/DNlgur7b.rss');
    
    if (!feed.items || feed.items.length === 0) {
      return null;
    }

    const latest = feed.items[0];
    
    return {
      title: latest.title || 'Latest Episode',
      audioUrl: latest.enclosure?.url || '',
      link: latest.link || 'https://dienerdshow.de/'
    };
  } catch (error) {
    console.error('Error fetching podcast feed:', error);
    return null;
  }
}
