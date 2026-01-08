
import { getLatestEpisode } from '../src/utils/podcast.js';

async function verify() {
    console.log('Fetching latest podcast episode...');
    try {
        const episode = await getLatestEpisode();
        if (episode) {
            console.log('Success! Latest Episode:');
            console.log(JSON.stringify(episode, null, 2));
        } else {
            console.error('Failed to fetch episode or no episodes found.');
        }
    } catch (error) {
        console.error('Error during verification:', error);
    }
}

verify();
