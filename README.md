# Personal Website

My personal website built with a minimalist approach using HTML and Tailwind CSS.

## Tech Stack

- HTML5 for structure
- [Tailwind CSS](https://tailwindcss.com/) via CDN for styling
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) font via CDN
- [PostHog](https://posthog.com/) for analytics
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

The website uses PostHog for analytics tracking. The PostHog script is included in the head section of all pages with the following configuration:

- Instance: EU Cloud (eu.i.posthog.com)
- Person Profiles: Identified Only
- Auto-capture: Enabled
- Session Recording: Disabled

### Adding Analytics to New Pages

When creating new pages, ensure the PostHog script is added in the `<head>` section before any other scripts:

```html
<!-- PostHog Analytics -->
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_qlOI7D1JSGrR6AfyU3S5nPZmQtXV1ZLtPr81UeQZbKY', {
        api_host: 'https://eu.i.posthog.com',
        person_profiles: 'identified_only',
    })
</script>
```

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
