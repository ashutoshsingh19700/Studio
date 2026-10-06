import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Aperture, Layers, Monitor, Sofa, Sparkles, Sun } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import CtaBanner from '@/components/sections/CtaBanner';
import type { SlotId } from '@/lib/slots';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'A modern, fully-equipped photography studio in Lucknow, with natural light, professional lighting, backdrops and a comfortable client lounge.',
};

const facilities = [
  { icon: Sun, title: 'Natural & studio light', text: 'Large windows plus a full set of strobes, softboxes and continuous lights.' },
  { icon: Layers, title: 'Backdrops & props', text: 'Paper, fabric and textured backdrops with a curated prop library.' },
  { icon: Sparkles, title: 'Makeup & changing room', text: 'A private, well-lit space to get ready before your shoot.' },
  { icon: Sofa, title: 'Client lounge', text: 'Relax, review frames and plan your looks in comfort.' },
  { icon: Monitor, title: 'Live preview', text: 'Tethered shooting so you can see every frame on a big screen.' },
  { icon: Aperture, title: 'Studio rentals', text: 'Hire the space by the hour for your own creative projects.' },
];

const gallery: { slot: SlotId; alt: string }[] = [
  { slot: 'studio-1', alt: 'Rumi Darwaza glowing at night' },
  { slot: 'studio-2', alt: 'Heritage palace facade at sunset' },
  { slot: 'studio-3', alt: 'Clock tower in black and white' },
  { slot: 'studio-4', alt: 'Heritage tomb in black and white' },
  { slot: 'studio-5', alt: 'Heritage building against a pale evening sky' },
  { slot: 'studio-6', alt: 'Horse carriage on a night street, black and white' },
];

export default function StudioPage() {
  return (
    <>
      <section className="page-hero studio-hero" aria-labelledby="studio-title">
        <div className="bg-photo bg-photo--right">
          <Photo slot="studio-main" alt="The KPDS studio interior" eager sizes="100vw" />
        </div>
        <div className="page-hero__shade" />
        <div className="container">
          <p className="eyebrow">Our Studio</p>
          <h1 id="studio-title">
            A Space Built
            <br />
            for Your Story.
          </h1>
          <p className="page-hero__lead">
            A modern, fully-equipped studio designed to bring your ideas to life, from intimate portraits to full
            brand campaigns.
          </p>
          <Link href="/contact" className="btn btn--peach" style={{ marginTop: 28 }}>
            Book the Studio <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="facilities" aria-labelledby="facilities-title">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">What&apos;s Inside</p>
            <h2 id="facilities-title" className="section-title">
              Everything You Need to Create
            </h2>
          </div>
          <div className="facilities__grid">
            {facilities.map((f, i) => (
              <div key={f.title} className="facility" data-reveal style={{ '--d': `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <f.icon aria-hidden="true" />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>

          <div data-reveal style={{ marginTop: 'clamp(48px, 5vw, 72px)' }}>
            <p className="eyebrow">Around Lucknow</p>
            <h2 className="section-title">Locations We Love to Shoot</h2>
          </div>
          <div className="studio-gallery">
            {gallery.map(({ slot, alt }, i) => (
              <div
                key={slot}
                className="studio-gallery__item"
                data-reveal
                style={{ '--d': `${(i % 3) * 0.08}s` } as React.CSSProperties}
              >
                <Photo slot={slot} alt={alt} sizes="(min-width:1024px) 33vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Ready to Shoot in Our Studio?" cta="Book a Session" />
    </>
  );
}
