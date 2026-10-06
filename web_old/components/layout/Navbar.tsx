'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(13,11,9,0.95)'
            : 'rgba(13,11,9,0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(240,201,160,0.1)' : 'none',
        }}
      >
        <div className="container-site flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none text-decoration-none" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}>
              K P D S
            </span>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'var(--color-gold)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
              PHOTO STUDIO
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${pathname === l.href ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/book" className="btn-primary hidden sm:inline-flex" style={{ fontSize: '0.72rem', padding: '0.55rem 1.1rem' }}>
              Book a Session →
            </Link>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="mobile-sheet">
          <div className="mobile-sheet-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="mobile-sheet-panel">
            <div className="flex justify-between items-center">
              <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', letterSpacing: '0.1em' }}>
                K P D S
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link text-base${pathname === l.href ? ' active' : ''}`}
                  style={{ fontSize: '1rem', padding: '0.25rem 0', borderBottom: '1px solid rgba(240,201,160,0.08)' }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/book" className="btn-primary mt-4 justify-center">
              Book a Session →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
