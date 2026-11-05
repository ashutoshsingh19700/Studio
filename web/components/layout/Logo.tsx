import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Amit Photography, home">
      <span className="logo__mark">AMIT</span>
      <span className="logo__sub">PHOTOGRAPHY</span>
    </Link>
  );
}
