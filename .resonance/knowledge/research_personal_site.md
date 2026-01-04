---
summary: Research on personal website strategy, design, and content for Oliver Thylmann
read_when:
  - building personal homepage
  - defining site requirements
  - writing copy for personal site
last_updated: 2026-01-04
---

# Research: Personal Homepage Strategy for Oliver Thylmann

**Objective**: Define the look, features, and content for Oliver Thylmann's personal homepage.
**Date**: 2026-01-04
**Researcher**: Research Engineer

## 1. User Persona & Content Strategy (The "Who")

**Who is Oliver Thylmann?**
- **Core Identity**: Serial Entrepreneur & "Developer Whisperer".
- **Current Role**: Co-Founder & Head of Relationships @ **Giant Swarm** (Kubernetes/Cloud Native).
- **Background**: Founded **Adcloud** (sold to DHL), **Ormigo**, **Catalyst Zero**, **STATSnet**.
- **Voice**: Experienced, pragmatic, technical yet human-centric, philosophical (e.g., "Random Ramblings").
- **Current Presence**: Distributed across Medium (writing), LinkedIn (professional), and Giant Swarm (corporate).

**Content Strategy: The Central Hub**
The website should not try to replace Medium or LinkedIn but act as the **Single Source of Truth** that ties them together.
- **Tone**: Professional but authentic. "I build things. I help developers."
- **Key Narrative**: A timeline of serial entrepreneurship leading to deep infrastructure expertise.

## 2. Design Direction (The "Look")

**Recommendation: "The Minimalist Architect"**
Avoid generic glossy startup templates. Go for a "sophisticated developer" aesthetic.

*   **Visual Style**:
    *   **Typography-First**: Large, bold headings (Inter, Roboto Mono, or system fonts).
    *   **Clean Layout**: Plenty of whitespace, single-column on mobile.
    *   **Performance**: Instant load times (it communicates technical competence).
    *   **Dark/Light Mode**: Essential for developer audience appeal.
*   **Inspiration**:
    *   Minimalist developer portfolios (e.g., pure HTML/CSS vibes but styled).
    *   "Digital Garden" aesthetic – curated, thoughtful.

## 3. Feature Set (The "What")

### Must-Haves (MVP)
1.  **Hero Section**: High-impact intro. "Hi, I'm Oliver. I build companies."
2.  **Ventures Timeline**: A chronological visual of the journey (STATSnet -> Ormigo -> Adcloud -> Catalyst Zero -> Giant Swarm). This is your strongest asset.
3.  **Link Aggregation (Bento Box)**: Clean links to:
    *   Medium ("Thoughts")
    *   LinkedIn ("Work")
    *   Giant Swarm ("Current Focus")
    *   Podcast ("Crypto Nerd Show")
4.  **Contact**: Simple `mailto` or a lightweight form (e.g., Formspree) to avoid spam.

### Nice-to-Haves (V2)
1.  **Dynamic Content Feed**: Pull latest 3 Medium post titles via RSS.
2.  **"Now" Page**: A dedicated /now page updating what you are keenly focused on *this month*.
3.  **Book/Tech Radar**: What you are reading or exploring (Kubernetes, Crypto, etc.).

## 4. Technical Recommendation

**Stack**: **GitHub Pages + Static Site Generator**
*   **Why**: You are technical. You want low maintenance, free hosting, and version control.
*   **Tools**:
    *   **Option A (Simplest)**: HTML5 + Vanilla CSS. Fastest, easiest to tweak.
    *   **Option B (Modern)**: **Astro**. Great performance, component-based, allows fetching Medium data easily at build time.
    *   **Option C (Classic)**: **Jekyll**. Native GitHub Pages support, but Ruby dependency can be annoying.

**Recommendation**: **Astro** or **Vanilla HTML/CSS**. Astro allows for scaling (components) without the weight of React.

## 5. Draft Content (Bio)

> **Oliver Thylmann**
> *Serial Entrepreneur. Developer Whisperer. Father.*
>
> I’ve spent two decades building companies that solve complex problems. From performance advertising at **Adcloud** to cloud-native infrastructure at **Giant Swarm**, I focus on where technology meets business value.
>
> Currently, I'm simplifying the cloud-native journey for enterprises at Giant Swarm and exploring the future of decentralized tech.
