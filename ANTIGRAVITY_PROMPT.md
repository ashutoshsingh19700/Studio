# Prompt for Antigravity: KPDS Photo Studio website

You are a senior full-stack engineer and UI designer. Build a complete, production-quality website for **KPDS Photo Studio** (photography / films / stories, based in Lucknow, India). The attached design reference shows 7 pages. Recreate them faithfully, pixel-close, in the same dark cinematic style. Also build a small private admin panel (details below).

Work in the empty folder `C:\Users\HP\Desktop\Studio`. Create a monorepo with two apps, `web/` (frontend) and `backend/` (API), plus a root `package.json` with a `dev` script that runs both with `concurrently`. This is the same layout I use in my Ad-Network project.

---

## 1. Tech stack (must match my Ad-Network project)

**Frontend (`web/`)**
- Next.js (App Router, latest 16.x) + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`) + `tw-animate-css`
- shadcn/ui (radix-ui, `class-variance-authority`, `clsx`, `tailwind-merge`)
- `react-hook-form` + `zod` + `@hookform/resolvers` for all forms
- `lucide-react` for icons (hugeicons is optional)
- `sonner` for toasts, `next-themes` is not needed (dark theme only)
- `next/image` for all images, `next/font` for fonts

**Backend (`backend/`)**
- NestJS 11 + TypeScript (Express platform)
- Prisma 6 + PostgreSQL, hosted on **Supabase** (use the Supabase connection string in `DATABASE_URL` and `DIRECT_URL`)
- `class-validator` + `class-transformer` for DTO validation
- `@nestjs/throttler` for rate limiting (important on the public booking endpoint)
- `bcrypt` for the admin password hash, `cookie-parser`, `compression`
- `@supabase/supabase-js` only if you need Supabase Storage for portfolio images, otherwise skip it
- Jest for tests, ESLint + Prettier configured as in a standard Nest project

**Explicitly DO NOT use:** Redis, Upstash, ClickHouse, Razorpay, PayPal, MaxMind, globe.gl, recharts, or any queue or analytics pipeline. This is a simple website. Postgres via Prisma is the only datastore.

---

## 2. Design system

- **Theme:** dark, cinematic, warm. Background near-black (`#0d0b09` to `#14110d`), cream sections (`#f3ead9`) used for contrast bands (see the "Our Services" and "Why Choose Us" strips on Home), warm gold/peach accent (`#f0c9a0`) for buttons, active nav state, and small labels.
- **Typography:** elegant serif for headings (Playfair Display or Cormorant Garamond), clean sans for body (Inter or Manrope). Small uppercase letter-spaced eyebrow labels (e.g. "WHAT WE DO", "OUR STORY") in gold above headings.
- **Components:** pill-shaped primary buttons (peach fill, dark text), outlined ghost buttons, rounded-2xl image cards with a bottom dark gradient and a label and circular arrow button, thin 1px borders at low-opacity white, subtle hover zoom on images, fade-up on scroll.
- **Layout:** max width about 1200px, generous spacing, fully responsive (mobile, tablet, desktop). Mobile nav is a slide-in sheet.
- **Shared layout:** sticky top nav (logo "KPDS PHOTO STUDIO" on the left, links Home, About, Services, Portfolio, Studio, Contact, and a "Book a Session" button on the right) and a footer (logo, same links, Instagram, Facebook and YouTube icons).
- Put all design tokens in Tailwind v4 `@theme` CSS variables so they are easy to change.
- Use placeholder images from `/public/images/...` with descriptive file names and a `README` listing which photo goes where, so I can swap in real photos. Use `next/image` with proper `alt` text. Do not hotlink random stock sites.

---

## 3. Pages to build (public site)

Routes: `/`, `/about`, `/services`, `/portfolio`, `/studio`, `/contact`. The "Studio" nav link goes to a studio page built from the "Our Studio" section shown on the About page, expanded into its own page. Also add `/book` (see section 4), and a `not-found` page.

### 01. Home (`/`)
1. **Hero:** eyebrow "PHOTOGRAPHY / FILMS / STORIES", headline "Moments, Made Timeless.", subtext "Professional photography and creative visual solutions for the moments that matter most.", buttons "Explore Our Work" (primary) and "Watch Showreel" (ghost with play icon, opens a video modal). Full-bleed wedding-couple photo with a dark gradient. Stats row: 5K+ Happy Clients, 8+ Years of Experience, 500+ Events Covered (animated count-up).
2. **Our Services** (cream band): short blurb, "View All Services" button, and 4 small image cards: Weddings, Portraits, Product, Events.
3. **Featured Work, "Stories Through Our Lens":** "View All" link and 4 tall image cards: Weddings, Portraits, Product, Events.
4. **Cinematic video banner:** camera image with a play button and the text "NOT JUST PHOTOS BUT MEMORIES THAT LAST".
5. **Why Choose Us** (cream band): 4 icon columns: Creative Vision, Professional Equipment, Experienced Team, Personalised Approach (each with one short line).
6. **CTA:** "Ready to Capture Your Story?" with a "Book a Session" button over a camera background.

### 02. About (`/about`)
- Hero: "OUR STORY", "More Than Just a Studio.", short paragraph, and a photographer photo. Stats: 8+ Years, 5K+ Clients, 500+ Events, 100% Passion.
- "The People Behind KPDS" (cream band): team paragraph, team photo, "Meet Our Team" button.
- "Our Studio" section: moody studio photo, short copy, "Explore Studio" link.
- Large serif quote: "We don't just take photos, we tell your story."

### 03. Services (`/services`)
- Hero: "OUR SERVICES", "Visual Stories for Every Occasion.", intro text, studio-lights photo.
- 6-card grid with image, title, and arrow: Wedding Photography, Portrait Photography, Product Photography, Family & Events, Fashion Photography, Commercial Shoots.
- "Additional Services" 2x2 icon cards: Cinematic Films, Photo Albums, Editing & Retouching, Studio Rentals (each with a short description).
- Each service card links to `/book?service=<slug>`.

### 04. Portfolio (`/portfolio`)
- Heading "OUR PORTFOLIO", "Real People. Real Stories."
- Filter pills: All, Weddings, Portraits, Products, Events, Fashion (client-side filter, animated).
- Masonry/uniform image grid (3 columns on desktop) with a lightbox on click (keyboard navigation and swipe).
- "Load More" button (paginate 12 at a time from the data file).

### 05. Testimonials ("What Our Clients Say")
Show this as a section on Home (below Why Choose Us) and also reuse it on About. It is a 2x2 grid of review cards with avatar, name, service, 5 stars, and quote, plus a "Share Your Experience" button that links to `/contact`. Seed with the 4 sample reviews from the design (Priya & Rohit, Sneha Singh, Lucknow-based clients, Rahul Sharma).

### 06. Blog teaser ("Tips, Stories & Inspirations")
Show this as a section on Home (above the CTA): 3 cards (image, title, date) and a "View More Articles" link. Keep blog content static in a typed data file in v1 (no CMS). Create `/blog` as a simple list page so the link works.

### 07. Contact (`/contact`)
- Left: "GET IN TOUCH", "Let's Create Something Beautiful.", short copy, contact details (phone +91 98765 43210, email hello@kpdsstudio.com, address Lucknow, India) and social icons.
- Right: contact form (Name, Email, Phone, Select Service, Message, "Send Message" button) validated with zod + react-hook-form. Submissions go to the backend and are stored (see section 4).
- Bottom: embedded map card ("Visit Our Studio", with a "Get Directions" link to Google Maps).

SEO: per-page `metadata`, Open Graph tags, `sitemap.ts`, `robots.ts`, and semantic HTML. Make the Lighthouse accessibility score 90+ (alt text, labels, focus rings, contrast).

---

## 4. Appointment booking

Every "Book a Session" button goes to `/book` (or opens a dialog with the same form). Fields:

- Full name (required)
- Email (required)
- Phone (required, Indian format friendly)
- Service (select, from the 6 services)
- Preferred date (date picker, no past dates)
- Preferred time slot (Morning / Afternoon / Evening)
- Event location / city (optional)
- Message / details (optional)

Behaviour:
- Validate on the client (zod) and again on the server (class-validator).
- On success show a confirmation screen and a sonner toast. Add a honeypot field and the throttler (e.g. 5 requests/minute/IP) to stop spam.
- The contact-form messages can use the same table with a `type` field (`BOOKING` or `ENQUIRY`) or a second small table. Your call, but keep it simple.
- Do not take payments. Do not send marketing emails. (Optional: leave a clean `NotificationService` stub where an email notification could be added later.)

**Prisma model (suggested):**
```prisma
model Booking {
  id          String        @id @default(cuid())
  type        BookingType   @default(BOOKING)
  name        String
  email       String
  phone       String
  service     String
  date        DateTime?
  timeSlot    String?
  location    String?
  message     String?
  status      BookingStatus @default(NEW)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  @@index([createdAt])
  @@index([status])
}
enum BookingType   { BOOKING ENQUIRY }
enum BookingStatus { NEW CONTACTED CONFIRMED COMPLETED CANCELLED }

model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

---

## 5. Admin panel (`/admin`), the ONLY private area

**Scope is strictly this: an admin can log in and see the appointment/booking info. Nothing else.** No CMS, no analytics, no user management, no other roles.

- `/admin/login`: email + password form. The backend verifies against the `Admin` table with bcrypt and sets an **httpOnly, secure, sameSite=lax cookie** holding a signed session token (JWT or signed session id). Rate-limit the login endpoint hard (e.g. 5 attempts per 15 minutes per IP).
- `/admin` (protected): a table of all bookings and enquiries, newest first, with columns Name, Phone, Email, Service, Preferred Date, Time Slot, Location, Message (expandable), Type, Status, Submitted At.
  - Search (name, phone, email), filter by status, type and date range, pagination.
  - A row detail drawer with all fields and quick actions: `tel:`, `mailto:` and WhatsApp (`wa.me`) links.
  - The admin can change a booking's **status** (NEW, CONTACTED, CONFIRMED, COMPLETED, CANCELLED). That is the only write action.
  - Small header counts (New / Confirmed / Total) are fine. No charts.
  - A "Download CSV" button is optional.
  - Logout button.
- **Security:**
  - Protect `/admin/*` in Next with a `proxy.ts` / middleware check for the session cookie, and protect every `/admin/*` API route in Nest with an `AdminGuard`. Never rely on frontend-only checks.
  - Public users must never be able to read bookings. The only public booking route is `POST`.
  - Add `<meta name="robots" content="noindex">` for admin pages and disallow them in `robots.ts`.
  - Add `helmet`-style security headers, CORS locked to the web origin, and a global `ValidationPipe` with `whitelist: true`.
- **Creating the admin:** there is no public signup. Provide `backend/scripts/create-admin.ts` (run with `npm run create-admin`) that takes an email and password from env vars or CLI args and writes a bcrypt-hashed row. Never hardcode credentials, and don't print the password.

---

## 6. Project structure

```
Studio/
  package.json            # concurrently dev script
  web/
    app/ (home, about, services, portfolio, studio, contact, blog, book, admin/...)
    components/ (ui/ from shadcn, layout/, sections/, forms/, admin/)
    lib/ (api client, zod schemas, content data, utils)
    public/images/
    proxy.ts
  backend/
    src/ (app.module, main, bookings/, admin-auth/, common/guards, prisma/)
    prisma/schema.prisma
    scripts/create-admin.ts
    test/
```

- All site copy and image lists live in typed data files under `web/lib/content/` so I can edit text without touching components.
- `.env.example` for both apps (`DATABASE_URL`, `DIRECT_URL`, `ADMIN_SESSION_SECRET`, `FRONTEND_URL`, `NEXT_PUBLIC_API_URL`). Never commit real secrets. Add a `.gitignore`.

---

## 7. Deliverables and acceptance criteria

1. All 7 designed pages (Home, About, Services, Portfolio, Testimonials section, Blog teaser section, Contact) plus Studio, Book, Blog list and 404 exist and visually match the reference's dark/cream palette, typography and spacing.
2. Fully responsive; no horizontal scroll at 360px; keyboard accessible.
3. Booking form on `/book` writes to Postgres via the Nest API; contact form writes too.
4. `/admin` is login-gated and shows bookings with search, filter and status update, and nothing else.
5. No Redis, ClickHouse, payment SDK or analytics dependency in either `package.json`.
6. `npm run dev` at the root starts web and backend; `npm run build` passes in both apps with no TypeScript or ESLint errors.
7. A short `README.md` with setup steps: install, env vars, `prisma migrate dev`, `create-admin`, run.
8. Add a few Jest tests for the booking DTO validation and the admin guard.

Before you start coding, show me a short plan (file tree + the Prisma schema), then build. Don't ask me questions unless something is truly blocking; use sensible defaults and note them in the README.
