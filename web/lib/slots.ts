/**
 * Every photo on the site lives in a named "slot".
 *
 * To add a photo: save a file called  <slot-id>.jpg  (or .jpeg / .png / .webp / .avif)
 * into  public/images/  and refresh. No code change needed. Until a file exists the
 * slot renders as a clean empty placeholder, so the layout always looks right.
 *
 * `size` is the recommended export size (px). `note` says what should be in the frame.
 */
export type Slot = { size: string; note: string };

export const SLOTS = {
  // ── Shared across pages ───────────────────────────────────────────────
  'og-cover': { size: '1200×630', note: 'Social share image (WhatsApp / Facebook link preview)' },

  // ── Home ──────────────────────────────────────────────────────────────
  'home-hero': { size: '1920×1100', note: 'Wedding couple, warm golden light. Couple should sit on the RIGHT half; left side fades to black behind the text' },
  'home-showreel': { size: '1920×700', note: 'Wide, dark, cinematic strip. The left side shows; it fades to black on the right where the play button and text sit' },
  'home-cta': { size: '1920×800', note: 'Camera on a dark table, soft warm light. Camera on the RIGHT, space on the left for text' },

  // ── Category photos (reused: Home services, Home featured work, Services page) ──
  'cat-weddings': { size: '1000×1250', note: 'Wedding couple portrait (4:5)' },
  'cat-portraits': { size: '1000×1250', note: 'Portrait of a woman, soft background (4:5)' },
  'cat-product': { size: '1000×1250', note: 'Product shot, e.g. watch on a dark stone (4:5)' },
  'cat-events': { size: '1000×1250', note: 'Event / festive lights or celebration (4:5)' },
  'cat-family': { size: '1000×1250', note: 'Family or couple seated together (4:5)' },
  'cat-fashion': { size: '1000×1250', note: 'Fashion editorial, full-length outfit (4:5)' },
  'cat-commercial': { size: '1000×1250', note: 'Commercial / food / brand shoot (4:5)' },

  // ── About ─────────────────────────────────────────────────────────────
  'about-hero': { size: '1500×1100', note: 'Photographer holding a camera to his eye, dark moody. Subject on the RIGHT' },
  'about-team': { size: '1100×850', note: 'Group photo of the KPDS team' },
  'studio-main': { size: '1920×1100', note: 'Studio interior, warm lighting (used on About and the Studio page)' },
  'about-quote': { size: '1920×700', note: 'Dark close-up of hands / wedding ring, behind the quote' },

  // ── Services ──────────────────────────────────────────────────────────
  'services-hero': { size: '1700×1000', note: 'Studio light on a stand with softbox, dark room. Light on the RIGHT' },

  // ── Portfolio ─────────────────────────────────────────────────────────
  'portfolio-hero': { size: '1700×800', note: 'Very dark, blurry studio scene (it is shown at low opacity behind the heading)' },
  'portfolio-01': { size: '900×~800', note: 'Wedding couple (weddings)' },
  'portfolio-02': { size: '900×~800', note: 'Portrait of a woman (portraits)' },
  'portfolio-03': { size: '900×~800', note: 'Watch close-up (products)' },
  'portfolio-04': { size: '900×~800', note: 'Bridal mehndi / jewellery detail (weddings)' },
  'portfolio-05': { size: '900×~800', note: 'Smiling child (portraits)' },
  'portfolio-06': { size: '900×~800', note: 'Couple with festive lights (events)' },
  'portfolio-07': { size: '900×~800', note: 'Black & white portrait (portraits)' },
  'portfolio-08': { size: '900×~800', note: 'Two men, black & white (events)' },
  'portfolio-09': { size: '900×~800', note: 'Bride in warm light (weddings)' },
  'portfolio-10': { size: '900×~800', note: 'Group of friends at an event (events)' },
  'portfolio-11': { size: '900×~800', note: 'Woman in sepia tones (fashion)' },
  'portfolio-12': { size: '900×~800', note: 'Black & white portrait (fashion)' },
  'portfolio-13': { size: '900×~800', note: 'Extra: wedding' },
  'portfolio-14': { size: '900×~800', note: 'Extra: portrait' },
  'portfolio-15': { size: '900×~800', note: 'Extra: product' },
  'portfolio-16': { size: '900×~800', note: 'Extra: event' },
  'portfolio-17': { size: '900×~800', note: 'Extra: fashion' },
  'portfolio-18': { size: '900×~800', note: 'Extra: wedding' },

  // ── Testimonials ──────────────────────────────────────────────────────
  'avatar-1': { size: '240×240', note: 'Client face, square: Priya & Rohit' },
  'avatar-2': { size: '240×240', note: 'Client face, square: Sneha Kapoor' },
  'avatar-3': { size: '240×240', note: 'Client face, square: Neha Mehta' },
  'avatar-4': { size: '240×240', note: 'Client face, square: Rahul Sharma' },

  // ── Blog ──────────────────────────────────────────────────────────────
  'blog-hero': { size: '1700×900', note: 'Camera sitting on an open laptop, dark. Camera on the RIGHT' },
  'blog-1': { size: '900×600', note: 'Article 1: portrait photography tips' },
  'blog-2': { size: '900×600', note: 'Article 2: choosing a wedding photographer' },
  'blog-3': { size: '900×600', note: 'Article 3: behind the scenes' },

  // ── Contact ───────────────────────────────────────────────────────────
  'contact-map': { size: '900×600', note: 'Map screenshot of the studio area (with a pin)' },

  // ── Studio page ───────────────────────────────────────────────────────
  'studio-1': { size: '1200×900', note: 'Studio page, locations gallery 1' },
  'studio-2': { size: '1200×900', note: 'Studio page, locations gallery 2' },
  'studio-3': { size: '1200×900', note: 'Studio page, locations gallery 3' },
  'studio-4': { size: '1200×900', note: 'Studio page, locations gallery 4' },
  'studio-5': { size: '1200×900', note: 'Studio page, locations gallery 5' },
  'studio-6': { size: '1200×900', note: 'Studio page, locations gallery 6' },
} as const satisfies Record<string, Slot>;

export type SlotId = keyof typeof SLOTS;
