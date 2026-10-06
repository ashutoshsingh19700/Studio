import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1>This frame is out of focus.</h1>
        <p>The page you are looking for has moved or does not exist. Let&apos;s get you back to the good stuff.</p>
        <Link href="/" className="btn btn--peach">
          Back to Home <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
