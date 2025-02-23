# Personal Website

My personal website built with a minimalist approach using HTML and Tailwind CSS.

## Tech Stack

- HTML5 for structure
- [Tailwind CSS](https://tailwindcss.com/) via CDN for styling
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) font via CDN
- [Beam Analytics](https://beamanalytics.io/) for analytics
- No JavaScript framework
- No static site generator
- No build step required

## Design Principles

- Monospace typography using JetBrains Mono
- Black & white color scheme with lime accents
- Narrow content width (~120 characters)
- Minimalist and clean interface
- Responsive design

## Analytics

The website uses Beam Analytics for analytics tracking. The Beam Analytics script is included in the head section of all pages with the following configuration:

- Token: d62099d2-5537-46f3-836a-033a81ac69a6

When creating new pages, ensure the Beam Analytics script is added in the `<head>` section before any other scripts:

```html
<!-- Beam Analytics -->
<script
  src="https://beamanalytics.b-cdn.net/beam.min.js"
  data-token="d62099d2-5537-46f3-836a-033a81ac69a6"
  async
></script>
```

You can visit the dashboard at:
- [Beam | Analytics](https://beamanalytics.io/dashboard/analytics)


## Project Structure

```
.
├── index.html          # Home page
├── blog/              
│   └── index.html     # Blog listing
├── projects/
│   └── index.html     # Projects showcase
├── about/
│   └── index.html     # About me page
└── resume.pdf         # Resume file
```

## Development

### Running Locally

The simplest way to run the website locally is using Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

The server will:
- Serve files from the current directory
- Handle directory-based routing (e.g., `/blog/` will serve `/blog/index.html`)
- Enable testing as if hosted on a real web server

To stop the server, press `Ctrl+C` in the terminal.

### Making Changes

1. All pages use the same base structure and styling
2. Tailwind classes are used for all styling
3. No build step is needed - edit HTML files directly
4. Navigation links are relative to the root (starting with `/`)

## Deployment

The site is deployed using GitHub Pages from the `main` branch. Any push to `main` will automatically trigger a deployment. 
