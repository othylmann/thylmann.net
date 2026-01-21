export interface VinylItem {
    id: number;
    artist: string;
    title: string;
    coverImage: string;
    thumb: string;
    format: string;
    year: number;
    genres: string[];
    styles: string[];
    notes: string;
    rating: number; // Community average
}

const DISCOGS_API_BASE = 'https://api.discogs.com';

/**
 * Fetches the user's vinyl collection from Discogs.
 * Requires DISCOGS_TOKEN in environment variables for high-res images and ratings.
 */
export async function getVinylCollection(username: string): Promise<VinylItem[]> {
    const token = import.meta.env.DISCOGS_TOKEN || process.env.DISCOGS_TOKEN;

    if (!token) {
        console.warn('DISCOGS_TOKEN not found. Images and ratings might be restricted.');
    }

    const headers: HeadersInit = {
        'User-Agent': 'TidalTransitVinylFetcher/1.0 +https://thylmann.net',
    };

    if (token) {
        headers['Authorization'] = `Discogs token=${token}`;
    }

    try {
        // 1. Fetch collection items
        const collectionUrl = `${DISCOGS_API_BASE}/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc`;
        const response = await fetch(collectionUrl, { headers });

        if (!response.ok) {
            throw new Error(`Discogs API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const releases = data.releases || [];

        // 2. Fetch community ratings for each release (16 items is safe for rate limits)
        // We do this concurrently
        const vinylItems: VinylItem[] = await Promise.all(
            releases.map(async (item: any) => {
                const info = item.basic_information;
                let communityRating = 0;

                try {
                    // Note: Community rating is sometimes in the main release object if we fetch it specifically
                    // To be safe and get the average, we fetch the release rating endpoint or the full release
                    const releaseUrl = `${DISCOGS_API_BASE}/releases/${info.id}`;
                    const releaseRes = await fetch(releaseUrl, { headers });
                    if (releaseRes.ok) {
                        const releaseData = await releaseRes.json();
                        communityRating = releaseData.community?.rating?.average || 0;
                    }
                } catch (e) {
                    console.error(`Failed to fetch rating for release ${info.id}:`, e);
                }

                return {
                    id: info.id,
                    artist: info.artists.map((a: any) => a.name).join(', '),
                    title: info.title,
                    coverImage: info.cover_image,
                    thumb: info.thumb,
                    format: info.formats.map((f: any) => `${f.name}${f.descriptions ? ` (${f.descriptions.join(', ')})` : ''}`).join(', '),
                    year: info.year,
                    genres: info.genres || [],
                    styles: info.styles || [],
                    notes: item.notes?.map((n: any) => n.value).join(' ') || '',
                    rating: communityRating,
                };
            })
        );

        return vinylItems;
    } catch (error) {
        console.error('Error fetching vinyl collection:', error);
        return [];
    }
}
