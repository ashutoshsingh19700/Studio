import { Camera, Gem, Heart, User } from 'lucide-react';
import { whyChooseUs } from '@/lib/content/services';

const icons = { gem: Gem, camera: Camera, user: User, heart: Heart } as const;

export default function WhyChooseUs() {
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why__card contain-lg">
        <div className="why__head" data-reveal>
          <h2 id="why-title">Why Choose Us</h2>
          <span className="why__rule" aria-hidden="true" />
        </div>
        <div className="why__grid">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} className="why__item" data-reveal style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
                <Icon className="why__icon" strokeWidth={1.4} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
