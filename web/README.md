# KPDS Photo Studio — website (web/)

Next.js 16 (App Router) + React 19 + TypeScript. Dark, cinematic design built to match the supplied mock-ups,
mobile-first (most visitors are on phones).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/portfolio` | Portfolio (filter chips, Load More, lightbox with swipe / arrow keys) |
| `/studio` | Studio (no mock-up supplied; built from the "Our Studio" section on About) |
| `/testimonials` | Testimonials |
| `/blog` | Blog |
| `/contact` | Contact (validated form) |

"Book a Session" buttons go to `/contact`. The Services cards pre-select the matching service in the form.

## Photos

Every photo on the site is a named **slot**. Save a file with that name into `public/images/` and refresh. No code
change. The full list (name, size, what goes there) is in [`public/images/README.md`](public/images/README.md), and
[`public/images/SOURCES.md`](public/images/SOURCES.md) says which original file each slot was made from. While
`npm run dev` runs, any empty slot shows its name in the corner.

**Still empty (no suitable photo yet):** `about-team` (team photo), `studio-main` (studio interior, used on About and
the Studio page), `contact-map` (map screenshot), `avatar-1…4` (client faces; initials show until you add them).

**Photo look.** Photos get a warm, cinematic grade to match the design. It is a few variables at the top of
`app/globals.css`: `--grade-home`, `--grade-hero` and `--grade-tint` (large background photos) and `--grade-card`
(cards and grids). Set them all to `none` to show photos exactly as exported. Each portfolio tile's crop focus is the `pos` value in
`lib/content/portfolio.ts`.

**Showreel video.** Save a file as `public/videos/showreel.mp4` and the "Watch Showreel" buttons play it
(see `public/videos/README.md`).

## Editing content

| What | Where |
|---|---|
| Phone, email, address, social links, WhatsApp number, showreel video URL, nav links | `lib/site.ts` |
| Services, "Why choose us" | `lib/content/services.ts` |
| Portfolio items (order, category, tile shape) | `lib/content/portfolio.ts` |
| Reviews | `lib/content/testimonials.ts` |
| Blog cards | `lib/content/blog.ts` |
| Colours, fonts, spacing, breakpoints | top of `app/globals.css` (`:root` tokens) |

To make "Watch Showreel" play a video, paste a YouTube/Vimeo **embed** URL into `showreelEmbedUrl` in `lib/site.ts`.

## Forms

The contact form validates in the browser (react-hook-form + zod) and shows a success state, but **nothing is sent
anywhere yet**. When the backend is ready, replace the body of `submitEnquiry()` in `lib/api.ts`.

## Responsive behaviour

Mobile-first CSS. Breakpoints: `640px` (wide phone / small tablet: two-column layouts) and `1024px` (desktop:
full nav and the desktop design). Below 1024px the header becomes a menu button with a full-screen menu.
