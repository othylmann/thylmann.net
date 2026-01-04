# ADR-001: Use Astro directly with GitHub Pages

**Status**: Accepted
**Date**: 2026-01-04
**Deciders**: System Architect, Oliver Thylmann

## Context
We are building a personal homepage for a serial entrepreneur ("The Minimalist Architect"). The site needs to be:
1.  **Fast**: High performance is a proxy for technical competence.
2.  **Maintainable**: Easy to add new ventures or blog posts.
3.  **Minimalist**: Clean code output, no unnecessary JavaScript bloat.
4.  **Hostable on GitHub Pages**: Free, version-controlled hosting.

We considered Raw HTML/CSS, Jekyll, and Astro.

## Decision
We will use **Astro** as the static site generator.

We chose this over **Jekyll** because Astro is modern, JavaScript-based (familiar ecosystem), and offers superior performance features (Island Architecture) if we ever need interactivity.

We chose this over **Raw HTML** because Astro provides component-based architecture (reusable Header/Footer/TimelineItem) while still compiling to zero-JavaScript HTML by default.

## Consequences
-   **Positive**:
    -   **Zero JS by default**: Site will be incredibly fast.
    -   **Component Model**: Can build a reusable `Timeline` component for the ventures section.
    -   **Content Collections**: Type-safe content management for blog posts or venture data.
    -   **Build Time Data Fetching**: Can easily fetch Medium RSS feed at build time.
-   **Negative**:
    -   **Build Step**: Requires a build step (GitHub Actions) vs just pushing HTML (though GitHub Actions is standard now).
    -   **Learning Curve**: Slight learning curve for Astro syntax (though it's very close to HTML).
