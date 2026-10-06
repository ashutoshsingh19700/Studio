import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { bookHref } from '@/lib/site';

type Props = {
  title?: string;
  cta?: string;
};

export default function CtaBanner({ title = 'Ready to Capture Your Story?', cta = 'Book a Session' }: Props) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="bg-photo bg-photo--right">
        <Photo slot="home-cta" alt="A bride in a beam of teal and red light" sizes="100vw" />
      </div>
      <div className="cta__shade" />
      <div className="container" data-reveal>
        <h2 id="cta-title">{title}</h2>
        <span className="cta__dash" aria-hidden="true" />
        <Link href={bookHref} className="btn btn--peach btn--lg">
          {cta} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
