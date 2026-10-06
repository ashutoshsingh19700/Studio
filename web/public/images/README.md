# Photos for KPDS Photo Studio

Every photo on the site has a **slot name**. To add a photo:

1. Export it at the suggested size (JPG is fine, ideally under ~500 KB; PNG, WebP and AVIF also work).
2. Save it in this folder using the slot name, e.g. `home-hero.jpg`.
3. Refresh the page. **No code change needed.** Until a file exists, that spot shows a clean empty placeholder.

While `npm run dev` is running, each empty placeholder shows its slot name in the corner so you can see exactly
which file goes where. Those labels never appear on the live site.

Some photos are reused on several pages (for example the `cat-*` photos appear on Home and on the Services page),
so one file fills all of those spots.

> This file is generated from `lib/slots.ts`. After adding a slot there, run `node scripts/make-photo-guide.mjs`.

## Shared across pages

| File name | Size (px) | What goes there |
|---|---|---|
| `og-cover.jpg` | 1200×630 | Social share image (WhatsApp / Facebook link preview) |

## Home

| File name | Size (px) | What goes there |
|---|---|---|
| `home-hero.jpg` | 1920×1100 | Wedding couple, warm golden light. Couple should sit on the RIGHT half; left side fades to black behind the text |
| `home-showreel.jpg` | 1920×700 | Wide, dark, cinematic strip. The left side shows; it fades to black on the right where the play button and text sit |
| `home-cta.jpg` | 1920×800 | Camera on a dark table, soft warm light. Camera on the RIGHT, space on the left for text |

## Category photos (reused: Home services, Home featured work, Services page)

| File name | Size (px) | What goes there |
|---|---|---|
| `cat-weddings.jpg` | 1000×1250 | Wedding couple portrait (4:5) |
| `cat-portraits.jpg` | 1000×1250 | Portrait of a woman, soft background (4:5) |
| `cat-product.jpg` | 1000×1250 | Product shot, e.g. watch on a dark stone (4:5) |
| `cat-events.jpg` | 1000×1250 | Event / festive lights or celebration (4:5) |
| `cat-family.jpg` | 1000×1250 | Family or couple seated together (4:5) |
| `cat-fashion.jpg` | 1000×1250 | Fashion editorial, full-length outfit (4:5) |
| `cat-commercial.jpg` | 1000×1250 | Commercial / food / brand shoot (4:5) |

## About

| File name | Size (px) | What goes there |
|---|---|---|
| `about-hero.jpg` | 1500×1100 | Photographer holding a camera to his eye, dark moody. Subject on the RIGHT |
| `about-team.jpg` | 1100×850 | Group photo of the KPDS team |
| `studio-main.jpg` | 1920×1100 | Studio interior, warm lighting (used on About and the Studio page) |
| `about-quote.jpg` | 1920×700 | Dark close-up of hands / wedding ring, behind the quote |

## Services

| File name | Size (px) | What goes there |
|---|---|---|
| `services-hero.jpg` | 1700×1000 | Studio light on a stand with softbox, dark room. Light on the RIGHT |

## Portfolio

| File name | Size (px) | What goes there |
|---|---|---|
| `portfolio-hero.jpg` | 1700×800 | Very dark, blurry studio scene (it is shown at low opacity behind the heading) |
| `portfolio-01.jpg` | 900×~800 | Wedding couple (weddings) |
| `portfolio-02.jpg` | 900×~800 | Portrait of a woman (portraits) |
| `portfolio-03.jpg` | 900×~800 | Watch close-up (products) |
| `portfolio-04.jpg` | 900×~800 | Bridal mehndi / jewellery detail (weddings) |
| `portfolio-05.jpg` | 900×~800 | Smiling child (portraits) |
| `portfolio-06.jpg` | 900×~800 | Couple with festive lights (events) |
| `portfolio-07.jpg` | 900×~800 | Black & white portrait (portraits) |
| `portfolio-08.jpg` | 900×~800 | Two men, black & white (events) |
| `portfolio-09.jpg` | 900×~800 | Bride in warm light (weddings) |
| `portfolio-10.jpg` | 900×~800 | Group of friends at an event (events) |
| `portfolio-11.jpg` | 900×~800 | Woman in sepia tones (fashion) |
| `portfolio-12.jpg` | 900×~800 | Black & white portrait (fashion) |
| `portfolio-13.jpg` | 900×~800 | Extra: wedding |
| `portfolio-14.jpg` | 900×~800 | Extra: portrait |
| `portfolio-15.jpg` | 900×~800 | Extra: product |
| `portfolio-16.jpg` | 900×~800 | Extra: event |
| `portfolio-17.jpg` | 900×~800 | Extra: fashion |
| `portfolio-18.jpg` | 900×~800 | Extra: wedding |

## Testimonials

| File name | Size (px) | What goes there |
|---|---|---|
| `avatar-1.jpg` | 240×240 | Client face, square: Priya & Rohit |
| `avatar-2.jpg` | 240×240 | Client face, square: Sneha Kapoor |
| `avatar-3.jpg` | 240×240 | Client face, square: Neha Mehta |
| `avatar-4.jpg` | 240×240 | Client face, square: Rahul Sharma |

## Blog

| File name | Size (px) | What goes there |
|---|---|---|
| `blog-hero.jpg` | 1700×900 | Camera sitting on an open laptop, dark. Camera on the RIGHT |
| `blog-1.jpg` | 900×600 | Article 1: portrait photography tips |
| `blog-2.jpg` | 900×600 | Article 2: choosing a wedding photographer |
| `blog-3.jpg` | 900×600 | Article 3: behind the scenes |

## Contact

| File name | Size (px) | What goes there |
|---|---|---|
| `contact-map.jpg` | 900×600 | Map screenshot of the studio area (with a pin) |

## Studio page

| File name | Size (px) | What goes there |
|---|---|---|
| `studio-1.jpg` | 1200×900 | Studio page, locations gallery 1 |
| `studio-2.jpg` | 1200×900 | Studio page, locations gallery 2 |
| `studio-3.jpg` | 1200×900 | Studio page, locations gallery 3 |
| `studio-4.jpg` | 1200×900 | Studio page, locations gallery 4 |
| `studio-5.jpg` | 1200×900 | Studio page, locations gallery 5 |
| `studio-6.jpg` | 1200×900 | Studio page, locations gallery 6 |

