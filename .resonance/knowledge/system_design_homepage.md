---
summary: System design and file structure for the personal homepage
read_when:
  - implementing project structure
  - adding new components
last_updated: 2026-01-04
---

# System Design: Personal Homepage (Astro)

**Architect**: System Architect
**Date**: 2026-01-04

## 1. High-Level Architecture
-   **SSG (Static Site Generation)**: Astro builds HTML at compile time.
-   **Hosting**: GitHub Pages (served via GitHub Actions).
-   **Data Sources**:
    -   **Local**: Markdown/JSON files for Ventures, Bio, Links.
    -   **Remote**: Medium RSS feed (fetched at build time).

## 2. File Structure

```
/
├── public/                 # Static assets (images, robots.txt, favicon)
│   ├── images/
│   │   └── oliver-profile.jpg
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BaseHead.astro  # <head> meta tags, SEO
│   │   ├── Header.astro    # Navigation
│   │   ├── Footer.astro    # Copyright, social icons
│   │   ├── Hero.astro      # "Hi, I'm Oliver"
│   │   ├── Timeline.astro  # The Ventures visualization
│   │   └── BentoGrid.astro # Link aggregation
│   ├── layouts/
│   │   └── BaseLayout.astro # Common HTML skeleton
│   ├── pages/              # File-based routing
│   │   └── index.astro     # The main homepage
│   ├── content/            # Data collections
│   │   └── ventures/       # JSON/Markdown for companies
│   │       ├── 01_statsnet.md
│   │       ├── 02_ormigo.md
│   │       ├── 03_adcloud.md
│   │       └── 04_giant_swarm.md
│   └── styles/
│       └── global.css      # Minimalist CSS variables
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # (Optional) if we use Tailwind, otherwise plain CSS
├── package.json
└── README.md
```

## 3. Data Flow
1.  **Ventures**: Stored as content collection entries. `Timeline.astro` queries this collection and maps over it to render the visual timeline.
2.  **Medium Posts**: `index.astro` fetches the RSS feed inside the frontmatter script (server-side build time) and passes the top 3 items to a `LatestWriting` component.

## 4. Key Components Design

### `Timeline.astro`
-   **Input**: List of Venture objects (Year, Name, Description, Link, Status).
-   **Visual**: Vertical line with nodes. Text on alternating sides (desktop) or single side (mobile).

### `BentoGrid.astro`
-   **Input**: List of Link objects.
-   **Visual**: CSS Grid layout. Big blocks for primary links (Giant Swarm), smaller blocks for socials.

## 5. Next Steps
1.  Initialize Astro project.
2.  Create `BaseLayout` and `Hero` component.
3.  Implement `Timeline` component.
