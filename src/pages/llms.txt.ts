import type { APIRoute } from "astro";
import { SITE, person, profiles, press, podcast } from "../data/person";
import { getLatestPosts, BLOG_URL, BLOG_FEED_URL } from "../utils/blog";

/**
 * llms.txt (https://llmstxt.org): a plain-markdown entry point for AI agents.
 * Built from the same data as the structured data, plus the latest Substack posts.
 */
export const GET: APIRoute = async () => {
  const posts = await getLatestPosts(10);

  const lines = [
    `# ${person.name}`,
    "",
    `> ${person.description}`,
    "",
    `${person.jobTitle} of Giant Swarm (https://giantswarm.io/), based in Cologne, Germany. Writes about building companies, technology, books and the ideas behind them.`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE}/): Overview, links to profiles and latest writing`,
    `- [About](${SITE}/about/): Biography, companies founded, press coverage`,
    `- [Reading List](${SITE}/books/): Books read, with ratings and reviews (via Goodreads)`,
    `- [Vinyl Collection](${SITE}/vinyl/): Record collection (via Discogs)`,
    "",
    "## Writing",
    "",
    `- [Blog: Oliver Thylmann's Musings](${BLOG_URL}/): Main blog on Substack. Full archive at ${BLOG_URL}/archive`,
    `- [Blog RSS feed](${BLOG_FEED_URL}): Full text of recent posts`,
    ...posts.map((p) => {
      const date = p.date ? new Date(p.date).toISOString().slice(0, 10) : "";
      const meta = [date, p.description].filter(Boolean).join(", ");
      return `- [${p.title}](${p.link})${meta ? `: ${meta}` : ""}`;
    }),
    "",
    "## Podcast",
    "",
    `- [${podcast.name}](${podcast.url}): German-language tech podcast (AI, crypto, chips, markets), co-hosted with Carlo Matic, Manuel Koelman and Sebastian Deutsch`,
    "",
    "## Press",
    "",
    ...press.map((p) => `- [${p.headline}](${p.url}): ${p.publisher}, ${p.datePublished}`),
    "",
    "## Optional",
    "",
    `- [LinkedIn](${profiles.linkedin})`,
    `- [X / Twitter](${profiles.x})`,
    `- [Medium](${profiles.medium}): Older long-form posts`,
    `- [GitHub](${profiles.github})`,
    `- [Giant Swarm blog posts](${profiles.giantSwarmAuthor})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
