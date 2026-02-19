# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No build step required.

## Architecture

Static HTML site with no framework, no build pipeline, and no JavaScript framework. All styling is done via Tailwind CSS loaded from CDN.

**Key files that need updating together when adding content:**

- `llms.txt` — machine-readable site index; update when adding blog posts or projects
- `sitemap.xml` — update `<lastmod>` dates and add new URLs when adding pages
- `blog/index.html` — blog listing page; add new post entries manually
- `index.html` — home page; may feature latest content

## Adding a Blog Post

1. Copy `blog/posts/_template.html` to `blog/posts/<slug>.html` and fill in `$TITLE`, `$DATE`, `$DESCRIPTION`, `$KEYWORDS`, `$TAG*`, and content.
2. Add the post entry to `blog/index.html`.
3. Add the post entry to the `blogPost` array in the Schema.org JSON-LD in `blog/index.html`.
4. Add a `<url>` entry to `sitemap.xml`.
5. Add the post to `llms.txt` under `### Blog Posts`.
6. If featuring on the home page, update `index.html`.

## Design Conventions

- **Font**: JetBrains Mono (monospace throughout)
- **Colors**: Black & white with violet (`hover:text-violet-600`) for interactive elements
- **Layout**: `max-w-3xl mx-auto` content width
- **Dates**: ISO format (`YYYY-MM-DD`) in `datetime` attributes; `js/dates.js` renders them as relative strings at runtime
- **Navigation**: Consistent across all pages — Home, Blog, Projects, About
- **Analytics**: Both Beam and PostHog scripts must be included in `<head>` of every new page. Copy the `<!-- Beam Analytics -->` and `<!-- PostHog Analytics -->` blocks from any existing page (e.g. `about/index.html`).

## JavaScript Utilities (`js/dates.js`)

- `<time datetime="YYYY-MM-DD">` elements get their text replaced with relative strings (e.g., "2 months ago")
- `[data-years-since="YYYY-MM-DD"]` elements get replaced with years elapsed
- `[data-current-year]` elements get the current year (used in footer copyright)

## Deployment

Pushing to `master` deploys automatically via GitHub Pages. The custom domain is `dsaiztc.com` (set in `CNAME`).
