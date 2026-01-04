---
summary: Visual design system tokens and guidelines for the personal homepage
read_when:
  - implementing CSS
  - designing new components
last_updated: 2026-01-04
---

# Design System: The Minimalist Architect

**Philosophy**: "Technical but Human." Premium, purposeful, and void of generic patterns.

## 1. Core Tokens

### Color Palette
We avoid pitch black (`#000000`) for a softer, more premium "dark mode" feel.

| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `#0F1115` | **Deep Charcoal**. The canvas. Absorbs light, easy on eyes. |
| `--color-text-primary` | `#E2E8F0` | **Off-White**. High contrast but not harsh. |
| `--color-text-secondary` | `#94A3B8` | **Slate Grey**. For metadata, dates, and subtle details. |
| `--color-accent` | `#FCD34D` | **Electric Amber**. Used *sparingly* for links, active states, and focal points. |
| `--color-accent-glow` | `rgba(252, 211, 77, 0.15)` | For subtle hovers and glassmorphism effects. |

### Typography
Two typefaces to balance the "Technical" and "Human" aspects.

*   **Headings**: **Space Grotesk** (Google Fonts).
    *   *Why?* It has quirky ink traps and a geometric feel that screams "modern tech" but with personality.
*   **Body**: **Inter** (Google Fonts).
    *   *Why?* Standard for legibility. Invisible UI. Allows the content to breathe.

### Spacing & Rhythm
Strict 4px baseline grid.
*   `--space-1`: 0.25rem (4px)
*   `--space-4`: 1rem (16px)
*   `--space-8`: 2rem (32px)
*   `--space-16`: 4rem (64px) - For section gaps (let it breathe!)

## 2. Visual Patterns

### Glassmorphism (Subtle)
Used for the "Bento Grid" cards.
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### The "Circuit Board" Timeline
The timeline shouldn't look like a standard Bootstrap list.
*   **Line**: A faint 1px line connecting nodes.
*   **Nodes**: Hollow circles interacting with the line.
*   **Active State**: When scrolling, the current venture lights up with the `--color-accent`.

### Micro-Interactions
*   **Links**: No default underline. On hover, a `--color-accent` underline expands from left to right.
*   **Cards**: Subtle `translateY(-4px)` lift on hover.

## 3. Implementation Guidelines
*   **No Tailwind Defaults**: We will configure Tailwind or pure CSS to strict use ONLY these tokens.
*   **Fluid Typography**: Use `clamp()` for font sizes to ensure perfect scaling from mobile to ultra-wide.
*   **Respect Dark Mode**: This is a dark-mode-first design. Light mode can be considered later (or not at all, typical for dev portfolios).
