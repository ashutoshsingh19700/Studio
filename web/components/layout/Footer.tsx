import Link from 'next/link';
import { navLinks } from '@/lib/site';
import Socials from '@/components/ui/Socials';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo />
        <nav className="footer__nav" aria-label="Footer">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Socials />
      </div>
    </footer>
  );
}
