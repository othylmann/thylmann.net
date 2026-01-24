export interface VinylArtist {
    id: number;
    name: string;
    url: string;
}

export interface VinylItem {
    id: number;
    artists: VinylArtist[];
    title: string;
    coverImage: string;
    thumb: string;
    format: string;
    year: number;
    genres: string[];
    styles: string[];
    notes: string;
    communityRating: number;
    personalRating: number;
    albumUrl: string;
}

const DISCOGS_API_BASE = "https://api.discogs.com";

/**
 * Fetches the user's vinyl collection from Discogs.
 * Requires DISCOGS_TOKEN in environment variables for high-res images and ratings.
 */
export async function getVinylCollection(
    username: string,
): Promise<VinylItem[]> {
    const token = import.meta.env.DISCOGS_TOKEN || process.env.DISCOGS_TOKEN;

    if (!token) {
        console.warn(
            "DISCOGS_TOKEN not found. Images and ratings might be restricted.",
        );
    }

    const headers: HeadersInit = {
        "User-Agent": "TidalTransitVinylFetcher/1.0 +https://thylmann.net",
    };

    if (token) {
        headers["Authorization"] = `Discogs token=${token}`;
    }

    try {
        // 1. Fetch collection items
        const collectionUrl = `${DISCOGS_API_BASE}/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc`;
        const response = await fetch(collectionUrl, { headers });

        if (!response.ok) {
            throw new Error(
                `Discogs API error: ${response.status} ${response.statusText}`,
            );
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
                        communityRating =
                            releaseData.community?.rating?.average || 0;
                    }
                } catch (e) {
                    console.error(
                        `Failed to fetch rating for release ${info.id}:`,
                        e,
                    );
                }

                return {
                    id: info.id,
                    artists: info.artists.map((a: any) => ({
                        id: a.id,
                        name: a.name,
                        url: `https://www.discogs.com/artist/${a.id}`,
                    })),
                    title: info.title,
                    coverImage: info.cover_image,
                    thumb: info.thumb,
                    format: info.formats
                        .map(
                            (f: any) =>
                                `${f.name}${f.descriptions ? ` (${f.descriptions.join(", ")})` : ""}`,
                        )
                        .join(", "),
                    year: info.year,
                    genres: info.genres || [],
                    styles: info.styles || [],
                    // Notes in Discogs collection releases are an array of { field_id: number, value: string }
                    // Common fields: 1 = Notes, 2 = Media Condition, 3 = Sleeve Condition
                    // We target field_id 1 (Notes) specifically if it exists, otherwise join all
                    notes:
                        item.notes?.find((n: any) => n.field_id === 1)?.value ||
                        item.notes?.map((n: any) => n.value).join(" ") ||
                        "",
                    communityRating,
                    personalRating: item.rating || 0,
                    albumUrl: `https://www.discogs.com/release/${info.id}`,
                };
            }),
        );

        return vinylItems;
    } catch (error) {
        console.error("Error fetching vinyl collection:", error);
        return [];
    }
}
