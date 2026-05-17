# Grassroot Networking - Ghana

A multi-page static website for Grassroot Networking, an organization empowering communities and connecting professionals across Ghana and the diaspora.

## Features

- **Home** — Hero video, about section, stats
- **Our Services** — Networking, Real Estate, Farming, Health, Consulting
- **The Team** — Team profiles with add-member form
- **Gallery** — Lazy-loaded image gallery with lightbox viewer
- **Reviews** — Community reviews with submission form
- **Careers** — Job listings with application form
- **Contact** — Contact info and message form
- **Admin** — Dashboard for site content overview

## Getting Started

### Static server (no backend)

```bash
npm install
npm run dev
```

Opens at `http://localhost:8081`

### Express server

```bash
npm install
npm run serve
```

Opens at `http://localhost:8082`

## Gallery Images

Place your gallery images in `assets/gallery/` with filenames matching the format referenced in `script.js` (e.g., `WhatsApp Image 2026-03-23 at 8.23.06 AM.jpeg`).

## Project Structure

```
├── index.html          # Main single-page app (tab-based navigation)
├── learn-more.html     # Learn more landing page
├── styles.css          # All styles
├── brand.css           # Shared brand identity tokens
├── script.js           # Client-side logic (gallery, forms, admin)
├── app.js              # Express server (optional)
├── logo.png            # Brand logo
├── hero-background.MP4 # Hero section video
├── assets/gallery/     # Gallery images (add your own)
└── package.json        # Project config
```

## Notes

- The admin panel uses client-side authentication for demo purposes. For production, implement server-side auth.
- Form submissions are handled client-side only (no backend persistence beyond localStorage for career applications).
