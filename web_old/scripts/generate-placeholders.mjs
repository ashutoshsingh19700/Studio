/**
 * generate-placeholders.mjs
 * Creates dark-themed SVG placeholder images for every slot in public/images/.
 * Run: node scripts/generate-placeholders.mjs
 * Replace each SVG with a real JPEG when you have the actual photos.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/images');

const images = [
  // Hero & banners
  { name: 'hero-wedding',       w: 1920, h: 1080, label: 'Hero — Wedding Couple' },
  { name: 'video-banner',       w: 1920, h:  800, label: 'Video Banner — Camera' },
  { name: 'cta-camera',         w: 1920, h:  900, label: 'CTA — Photographer' },
  // About
  { name: 'about-hero',         w: 1920, h: 1080, label: 'About Hero' },
  { name: 'team-group',         w:  900, h:  600, label: 'Team Group Photo' },
  // Services
  { name: 'services-hero',      w: 1920, h: 1080, label: 'Services Hero — Studio Lights' },
  { name: 'service-wedding',    w:  600, h:  400, label: 'Wedding Photography' },
  { name: 'service-portrait',   w:  600, h:  400, label: 'Portrait Photography' },
  { name: 'service-product',    w:  600, h:  400, label: 'Product Photography' },
  { name: 'service-events',     w:  600, h:  400, label: 'Family & Events' },
  { name: 'service-fashion',    w:  600, h:  400, label: 'Fashion Photography' },
  { name: 'service-commercial', w:  600, h:  400, label: 'Commercial Shoots' },
  // Portfolio
  { name: 'portfolio-w1',  w: 600, h: 750, label: 'Wedding 1' },
  { name: 'portfolio-w2',  w: 600, h: 500, label: 'Wedding 2' },
  { name: 'portfolio-w3',  w: 600, h: 650, label: 'Wedding 3' },
  { name: 'portfolio-w4',  w: 600, h: 600, label: 'Wedding 4' },
  { name: 'portfolio-p1',  w: 600, h: 800, label: 'Portrait 1' },
  { name: 'portfolio-p2',  w: 600, h: 600, label: 'Portrait 2' },
  { name: 'portfolio-pr1', w: 600, h: 600, label: 'Product 1' },
  { name: 'portfolio-pr2', w: 600, h: 500, label: 'Product 2' },
  { name: 'portfolio-e1',  w: 600, h: 700, label: 'Event 1' },
  { name: 'portfolio-e2',  w: 600, h: 600, label: 'Event 2' },
  { name: 'portfolio-f1',  w: 600, h: 750, label: 'Fashion 1' },
  { name: 'portfolio-f2',  w: 600, h: 650, label: 'Fashion 2' },
  // Studio
  { name: 'studio-interior',   w: 1200, h:  800, label: 'Studio Interior' },
  { name: 'studio-gallery-1',  w:  600, h:  400, label: 'Studio Gallery 1' },
  { name: 'studio-gallery-2',  w:  600, h:  400, label: 'Studio Gallery 2' },
  { name: 'studio-gallery-3',  w:  600, h:  400, label: 'Studio Gallery 3' },
  // Team
  { name: 'team-1', w: 400, h: 500, label: 'Karan Pandey' },
  { name: 'team-2', w: 400, h: 500, label: 'Pooja Dixit' },
  { name: 'team-3', w: 400, h: 500, label: 'Deepak Singh' },
  // Avatars
  { name: 'avatar-1', w: 80, h: 80, label: 'Priya & Rohit' },
  { name: 'avatar-2', w: 80, h: 80, label: 'Sneha Singh' },
  { name: 'avatar-3', w: 80, h: 80, label: 'Client 3' },
  { name: 'avatar-4', w: 80, h: 80, label: 'Rahul Sharma' },
  // Blog
  { name: 'blog-1', w: 600, h: 400, label: 'Blog — Portrait Tips' },
  { name: 'blog-2', w: 600, h: 400, label: 'Blog — Wedding Photographer' },
  { name: 'blog-3', w: 600, h: 400, label: 'Blog — Behind the Scenes' },
  // Other
  { name: 'map-placeholder', w: 1200, h: 280, label: 'Map — Lucknow Studio' },
  { name: 'og-cover',        w: 1200, h: 630, label: 'OG Cover' },
];

fs.mkdirSync(OUT, { recursive: true });

let created = 0;
for (const { name, w, h, label } of images) {
  const filePath = path.join(OUT, `${name}.jpg`);
  // Don't overwrite real photos
  if (fs.existsSync(filePath)) { console.log(`  skip  ${name}.jpg (exists)`); continue; }

  const cx = w / 2;
  const cy = h / 2;
  const fontSize = Math.max(12, Math.min(w / 18, 22));
  const smallFont = Math.max(10, fontSize * 0.65);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1612"/>
      <stop offset="100%" stop-color="#0d0b09"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="${cx - 28}" y="${cy - 28}" width="56" height="56" rx="4" fill="none" stroke="#f0c9a0" stroke-width="1.5" opacity="0.35"/>
  <circle cx="${cx}" cy="${cy}" r="10" fill="none" stroke="#f0c9a0" stroke-width="1.5" opacity="0.35"/>
  <text x="${cx}" y="${cy + 52}" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="#f0c9a0" opacity="0.55">${label}</text>
  <text x="${cx}" y="${cy + 52 + smallFont + 8}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${smallFont}" fill="#6b5e50" opacity="0.7">Replace with real photo — ${w}×${h}</text>
</svg>`;

  // Write as .jpg extension (browsers handle SVG content fine via next/image unoptimised path)
  fs.writeFileSync(filePath, svg, 'utf8');
  console.log(`  ✓  ${name}.jpg  (${w}×${h})`);
  created++;
}

console.log(`\nDone — ${created} placeholder(s) created in public/images/`);
