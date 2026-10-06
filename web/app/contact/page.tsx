import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import Socials from '@/components/ui/Socials';
import { MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import ContactForm from '@/components/forms/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Book a session or ask a question. Call ${site.phone} or email ${site.email}. Visit us in ${site.city}.`,
};

export default function ContactPage() {
  return (
    <section className="split contact" aria-labelledby="contact-title">
      <div className="container split__grid">
        <div className="contact__info" data-reveal>
          <p className="eyebrow">Get in Touch</p>
          <h1 id="contact-title">
            Let&apos;s Create
            <br />
            Something Beautiful.
          </h1>
          <p className="split__lead">We&apos;d love to hear from you. Book a session, ask a question or just say hello.</p>

          <div className="contact__rows">
            <div className="contact-row">
              <PhoneIcon />
              <div>
                <strong>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                </strong>
                <span>{site.phoneHours}</span>
              </div>
            </div>
            <div className="contact-row">
              <MailIcon />
              <div>
                <strong>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </strong>
                <span>{site.emailNote}</span>
              </div>
            </div>
            <div className="contact-row">
              <PinIcon />
              <div>
                <strong>{site.city}</strong>
                <span>Visit our studio</span>
              </div>
            </div>
          </div>

          <Socials />
        </div>

        <div className="contact__form" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>

        <div className="contact__map" data-reveal>
          <div className="map-card">
            <div className="map-card__img">
              <Photo slot="contact-map" alt="Map showing the KPDS studio location" sizes="(min-width:1024px) 30vw, 90vw" />
            </div>
            <div className="map-card__body">
              <h2>Visit Our Studio</h2>
              <address>
                {site.addressLines.map((line) => (
                  <span key={line} style={{ display: 'block' }}>
                    {line}
                  </span>
                ))}
              </address>
              <Link href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Get Directions <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
