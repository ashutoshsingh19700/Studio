# KPDS Photo Studio — Website

> Photography · Films · Stories · Lucknow, India

A dark, cinematic photography studio website built with **Next.js 16 + Tailwind CSS v4**.

---

## Quick Start (Frontend only)

```bash
# 1. Install dependencies
cd web
npm install

# 2. Copy env
cp .env.local.example .env.local
# (edit NEXT_PUBLIC_API_URL if needed)

# 3. Generate placeholder images (run once; skip-over real photos)
node scripts/generate-placeholders.mjs

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
Studio/
├── package.json          # root: concurrently dev script
├── web/                  # Next.js 16 App Router (THIS README)
│   ├── app/              # pages: /, /about, /services, /portfolio,
│   │                     #        /studio, /contact, /book, /blog
│   ├── components/
│   │   ├── layout/       # Navbar, Footer
│   │   └── sections/     # HeroSection, ServicesSection, FeaturedWork,
│   │                     # VideoBanner, WhyChooseUs, TestimonialsSection,
│   │                     # BlogTeaser, CtaBanner
│   ├── lib/
│   │   ├── content/      # All site copy as typed TS data files
│   │   └── utils.ts      # cn(), formatDate()
│   └── public/images/    # Drop your real photos here
│       └── README.md     # Lists every image slot with dimensions
└── backend/              # NestJS 11 API (see backend/README.md)
```

---

## Adding Your Real Photos

1. Open `web/public/images/README.md` — it lists every image slot with exact dimensions.
2. Replace the SVG placeholder files with real JPEGs (same filename, e.g. `hero-wedding.jpg`).
3. Once all real photos are in place, remove `unoptimized: true` from `web/next.config.ts` so Next.js can optimise them.

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, Services, Featured Work, Video Banner, Why Choose Us, Testimonials, Blog Teaser, CTA |
| `/about` | Our Story, Team, Studio section, Quote, Testimonials |
| `/services` | 6-service grid + Additional Services |
| `/portfolio` | Filter pills + masonry grid + lightbox |
| `/studio` | Studio features, gallery, team |
| `/contact` | Contact form + map card |
| `/book` | Full booking form |
| `/blog` | Blog article list |

---

## Design System

All design tokens live in `app/globals.css` under `@theme { ... }`:

| Token | Value |
|-------|-------|
| `--color-bg-deep` | `#0d0b09` (near-black background) |
| `--color-cream` | `#f3ead9` (warm contrast sections) |
| `--color-gold` | `#f0c9a0` (accent — buttons, labels, hover) |
| `--font-serif` | Cormorant Garamond (headings) |
| `--font-sans` | Inter (body text) |

---

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript
- **Tailwind CSS v4** — `@tailwindcss/postcss`, `@theme` tokens
- **Fonts** — Cormorant Garamond + Inter via `next/font/google`
- **Icons** — `lucide-react`
- **Toasts** — `sonner`
- **Forms** — `react-hook-form` + `zod` + `@hookform/resolvers`

---

## Environment Variables

```env
# web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Connecting to the Backend

When the NestJS backend is running (`cd backend && npm run start:dev`), the booking form at `/book` and the contact form at `/contact` will POST to `http://localhost:4000/bookings` automatically.

Without the backend, the forms will show an error toast — all other pages work fully without it.
