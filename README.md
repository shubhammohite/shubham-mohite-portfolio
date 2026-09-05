# Shubham Mohite — Portfolio

A premium, animated personal portfolio built with React, Vite and Framer Motion. Showcases skills, projects, experience, education and achievements for Shubham Suresh Mohite — Software Engineer/Angular Developer/Frontend Developer/Wordpress Developer.

## Tech Stack

- **React 18** + **Vite** — fast dev server & optimized production build
- **JavaScript** (no TypeScript)
- **Plain CSS** with CSS custom properties (design tokens) — no Tailwind
- **Framer Motion** — page-load, scroll-reveal and hover animations
- **React Icons** — technology, social and UI icons

## Features

- Glassmorphism cards, animated gradient blobs and a floating particle field
- Floating navbar with active-section highlighting and a mobile menu
- Dark / light theme toggle
- Animated typing effect in the hero for rotating job titles
- Scroll progress bar, "Back to top" button, and a loading screen
- Animated counters, card hover/tilt interactions, and scroll-triggered reveals
- Project cards with a details modal (features, tech stack, links)
- A working contact form (client-side validation; opens the visitor's email client — swap in a real backend for production, see below)
- Fully responsive: mobile, tablet and desktop
- SEO meta tags, Open Graph / Twitter cards, and a favicon

## Project Structure

```
snova-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Projects/          # includes ProjectModal
│   │   ├── Experience/
│   │   ├── Education/
│   │   ├── Achievements/
│   │   ├── Certificates/
│   │   ├── Resume/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Loader/
│   │   ├── ScrollProgress/
│   │   ├── BackToTop/
│   │   ├── ParticlesBackground/
│   │   ├── AnimatedBlobs/
│   │   ├── ThemeToggle/
│   │   └── SectionEyebrow/
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/                  # skills.js, projects.js, education.js, achievements.js
│   ├── hooks/                 # useTypingEffect, useActiveSection, useCounter
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # design tokens + global styles
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

Each component folder contains a `.jsx` file paired with its own `.css` file, so styles stay scoped to the component that owns them.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` and opens automatically.

### Build for production

```bash
npm run build
```

Output is generated in `dist/`.

### Preview the production build

```bash
npm run preview
```

## Content You Should Personalize Before Publishing

A few placeholders are included on purpose and should be swapped for real values:

| File | What to update |
|---|---|
| `public/resume-shubham-mohite.pdf` | Add the actual resume PDF (referenced by the Hero and Resume download buttons) |
| `public/og-image.png` | Add a 1200×630 social-preview image (referenced in `index.html` Open Graph tags) |
| `src/data/projects.js` | Real GitHub repo URLs and live demo links for each project |
| `src/components/Hero/Hero.jsx` / `src/components/Contact/Contact.jsx` | Real GitHub, LinkedIn, email and phone links |
| `src/components/Contact/Contact.jsx` | Replace the `mailto:` fallback with a real form backend (see below) |

### Wiring up a real contact form

The contact form currently validates input client-side and opens the visitor's email client via a `mailto:` link — it works with zero backend, but a dedicated form service is recommended for production. Two easy options:

1. **Formspree** — create a form at formspree.io, then `POST` the form data to your form endpoint URL instead of building the `mailto:` link.
2. **EmailJS** — install `@emailjs/browser` and call `emailjs.send(...)` inside `handleSubmit` in `src/components/Contact/Contact.jsx`.

## SEO & Production Readiness

Beyond meta tags and Open Graph/Twitter cards (already in `index.html`), this project includes:

- **`public/robots.txt`** — allows all crawlers and points to the sitemap. Update the domain once deployed.
- **`public/sitemap.xml`** — a minimal sitemap for the single-page site. Update `<loc>` to your real domain.
- **JSON-LD structured data** (`schema.org/Person`) in `index.html` — helps search engines understand who the site belongs to and can surface richer results. Update the `sameAs` links and `alumniOf` if needed.
- **Canonical URL** (`<link rel="canonical">`) — set to your real domain once deployed.

### Enabling analytics (optional)

An analytics script is intentionally **not** enabled by default. To turn it on:

1. Sign up for [Plausible](https://plausible.io) (cookie-free, no consent banner required in most jurisdictions) or swap in Google Analytics / another provider.
2. Uncomment the `<script>` tag near the bottom of `<head>` in `index.html` and set `data-domain` to your real domain.

### Image optimization (once you add real project screenshots)

The project cards currently use CSS gradient placeholders instead of images, so there's nothing to optimize yet — but once you swap in real screenshots (see "Real project visuals" below), keep these in mind:

- Export screenshots as WebP where possible (much smaller than PNG/JPEG at similar quality).
- Add `loading="lazy"` to any `<img>` tags below the fold (the browser will defer loading them until they're near the viewport).
- Provide `width`/`height` attributes (or `aspect-ratio` in CSS, already set on `.project-cover`) so the layout doesn't shift while images load.
- For a photo that needs to look sharp on high-DPI screens without over-serving mobile users, use `srcset` with 1x/2x variants.

## Deployment (Vercel)

This project includes a `vercel.json` with a catch-all rewrite so client-side routing/anchors work correctly.

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**.

Alternatively, from the CLI:

```bash
npm install -g vercel
vercel
```

### Deploying elsewhere (Netlify, GitHub Pages, etc.)

Any static host works since this builds to plain HTML/CSS/JS in `dist/`:

- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then publish the `dist/` folder (a GitHub Action or `gh-pages` package can automate this).

## Accessibility & Performance Notes

- Respects `prefers-reduced-motion` for particles and animated blobs.
- Uses `IntersectionObserver` for scroll-reveal and active-nav-link tracking instead of scroll-event polling.
- Components are split per section so Vite can code-split effectively; icons are imported individually from `react-icons` to keep bundles lean.

## License

Free to use and adapt for your own portfolio.
