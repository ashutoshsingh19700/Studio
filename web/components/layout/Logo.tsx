import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="KPDS Photo Studio, home">
      <span className="logo__mark">KPDS</span>
      <span className="logo__sub">PHOTO STUDIO</span>
    </Link>
  );
}
