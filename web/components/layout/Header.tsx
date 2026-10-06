'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { bookHref, navLinks } from '@/lib/site';
import { MenuIcon } from '@/components/ui/Icons';
import Socials from '@/components/ui/Socials';
import Logo from './Logo';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock page scroll + Esc to close while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header__inner">
          <Logo />

          <nav className="nav" aria-label="Main">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(pathname, l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href={bookHref} className="btn btn--peach header__cta">
            Book a Session <ArrowRight />
          </Link>

          <button
            type="button"
            className="menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="container mobile-menu__top">
          <span onClick={() => setOpen(false)}>
            <Logo />
          </span>
          <button type="button" className="menu-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <nav className="mobile-menu__links" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <Link href={bookHref} className="btn btn--peach btn--block" onClick={() => setOpen(false)}>
              Book a Session <ArrowRight />
            </Link>
            <Socials />
          </div>
        </div>
      </div>
    </>
  );
}
