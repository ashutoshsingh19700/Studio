import { Eye, Camera, Users, Heart } from 'lucide-react';

const pillars = [
  { icon: Eye, title: 'Creative Vision', desc: 'Unique and artistic storytelling.' },
  { icon: Camera, title: 'Professional Equipment', desc: 'Latest cameras and lighting setups.' },
  { icon: Users, title: 'Experienced Team', desc: 'Years of expertise in every frame.' },
  { icon: Heart, title: 'Personalised Approach', desc: 'Tailored to your style and requirements.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-cream" style={{ padding: '4.5rem 0' }}>
      <div className="container-site">
        <h2 className="heading-xl" style={{ color: '#14110d', textAlign: 'center', marginBottom: '0.75rem' }}>
          Why Choose Us
        </h2>
        <p style={{ textAlign: 'center', color: '#6b5040', fontSize: '0.85rem', marginBottom: '3rem' }}>
          What sets us apart from the rest
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '3.2rem', height: '3.2rem',
                borderRadius: '50%',
                border: '1px solid rgba(196,149,106,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-gold-muted)',
                background: 'rgba(196,149,106,0.08)',
              }}>
                <Icon size={20} />
              </div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', fontWeight: 600, color: '#14110d' }}>
                {title}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#6b5040', lineHeight: 1.6 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
