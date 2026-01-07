# ADR-001: Quotes Data & Component Architecture

**Status**: Accepted
**Date**: 2026-01-07
**Deciders**: System Architect

## Context
The user wants to integrate a large collection of quotes (~600 entries) from a Markdown file into the homepage, specifically floating near the Hero section. The requirements are:
1.  **High-impact, low-friction**: Display should be subtle but readable.
2.  **Performance**: Avoid loading 600 quotes in the client-side bundle.
3.  **Modern Layout**: Responsive (mobile-first stack, desktop-row/float).

## Decision
We will implement a **Build-Time Selection Pattern** for the Quotes:

1.  **Data Transformation**: A utility function will read `src/data/quotes.md` at build-time.
2.  **Parsing**: The parser will use simple RegEx to split lines by the last `-` character to separate quoted text from attribution.
3.  **Selection**: A single random quote will be selected at build-time. This ensures that:
    - Zero JavaScript is shipped for the quotes list.
    - The HTML only contains the selected quote.
    - Each build (or every 24h if automated) updates the "Quote of the Day."
4.  **Component**: A new `QuoteBox.astro` component will manage the layout using Tailwind CSS for the desktop-float/mobile-stack logic.

## Consequences
- **Positive**: 
    - Zero performance impact on the client.
    - Easy to maintain (user just keeps editing `quotes.md`).
    - SEO friendly (text is in HTML).
- **Negative**: 
    - Quote only changes on site rebuild. 
    - Randomness is tied to build frequency (though sufficient for a personal site).
- **Risks**:
    - Parsing errors if a quote contains multiple `-` characters (mitigated by using `lastIndexOf('-')` or similar).
