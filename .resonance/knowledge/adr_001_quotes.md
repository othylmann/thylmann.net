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
We will implement an **Automated Build-Time Selection Pattern** for the Quotes:

1.  **Build-Time Selection**: The `QuoteBox.astro` component will continue to select one random quote from `src/data/quotes.md` during the build process.
2.  **Daily Automation**: We will modify the GitHub Actions deployment workflow to include a `schedule` trigger (cron).
3.  **Frequency**: The site will automatically rebuild and redeploy once every 24 hours (e.g., at midnight).
4.  **UI Feedback**: The `QuoteBox` will be titled "Quote of the Day" to clarify its frequency to the user.

## Consequences
- **Positive**: 
    - Zero client-side JavaScript.
    - Zero performance impact.
    - Guaranteed rotation every 24 hours.
    - Contextual labeling ("Quote of the Day") adds to the human/curated feel.
- **Negative**: 
    - Quote only updates once per day (unless owner pushes code).
    - GitHub Actions consumes a small amount of minutes daily (well within free tier).
