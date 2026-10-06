'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container-site py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-text-primary)', letterSpacing: '0.12em' }}>
                K P D S
              </p>
              <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--color-gold)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                PHOTO STUDIO
              </p>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', maxWidth: '22rem', lineHeight: 1.7 }}>
              Professional photography and creative visual solutions for the moments that matter most. Based in Lucknow, India.
            </p>
            <div className="flex gap-4 mt-1">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="eyebrow mb-4">Quick Links</p>
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="nav-link" style={{ fontSize: '0.83rem' }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-4">Get in Touch</p>
            <div className="flex flex-col gap-2" style={{ fontSize: '0.83rem', color: 'var(--color-text-secondary)' }}>
              <p>+91 98765 43210</p>
              <p>hello@kpdsstudio.com</p>
              <p>Lucknow, Uttar Pradesh, India</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} KPDS Photo Studio. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Photography · Films · Stories
          </p>
        </div>
      </div>
    </footer>
  );
}
