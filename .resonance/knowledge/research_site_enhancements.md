# Research: Site Enhancements (V2)

**Question**: How can we implement the "Nice-to-Have" features while maintaining the "Minimalist Architect" aesthetic?  
**Date**: 2026-01-07  
**Researcher**: Research Engineer

## Summary (TL;DR)
Recommended moving forward with a build-time Medium RSS feed fetch, a dedicated `/now` page based on Derek Sivers' pattern, and a manually curated "Tech Radar" using Astro Content Collections.

## Findings

### 1. Dynamic Content (Medium Feed)
- **Method**: Fetch `https://medium.com/feed/@othylmann` at build time.
- **Implementation**: Use `rss-parser` (NPM) to convert the XML feed to JSON objects.
- **Pros**: Automated updates, zero performance hit for visitors (SSG), pulls rich snippets.
- **Cons**: Requires a site rebuild to update.

### 2. The "/now" Page
- **Pattern**: Based on [nownownow.com](https://nownownow.com/).
- **Content**: Professional (current Giant Swarm focus), Personal (current reading/city), and Philosophical.
- **Pros**: Increases authenticity, reduces "What are you doing?" email clutter.

### 3. Tech Radar / Reading List
- **Method**: Astro Content Collections.
- **Structure**: Markdown files in `src/content/tech-radar/`.
- **Pros**: Highly curated, full design control.

## Recommendation
1.  **Immediate**: Implement the `/now` page.
2.  **Short-term**: Integrate the Medium Feed into the Bento Box.
3.  **Long-term**: Create a curated Tech Radar.

## Sources
1.  [Astro RSS Documentation](https://docs.astro.build/en/guides/rss/)
2.  [The /now movement](https://sive.rs/nowff)
3.  [Astro Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
