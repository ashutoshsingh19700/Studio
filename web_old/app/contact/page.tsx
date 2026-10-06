'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { toast } from 'sonner';

const services = [
  'Wedding Photography', 'Portrait Photography', 'Product Photography',
  'Family & Events', 'Fashion Photography', 'Commercial Shoots', 'Studio Rental', 'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '', website: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    if (!form.name || !form.email || !form.phone || !form.service || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'ENQUIRY' }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      toast.success('Message sent! We\'ll be in touch soon.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page header */}
      <section className="section-dark" style={{ paddingTop: '8rem', paddingBottom: '0' }}>
        <div className="container-site" style={{ paddingBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>GET IN TOUCH</p>
          <h1 className="heading-display">Let&apos;s Create<br />Something Beautiful.</h1>
        </div>
      </section>

      {/* Main */}
      <section className="section-dark" style={{ padding: '3rem 0 5rem' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>

            {/* Left */}
            <div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                We&apos;d love to hear from you. Whether you want to book a session, ask a question or just say hello — drop us a message!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: Phone, label: 'Mon – Sat, 10AM – 7PM', value: '+91 98765 43210' },
                  { icon: Mail, label: 'hello@kpdsstudio.com', value: 'hello@kpdsstudio.com' },
                  { icon: MapPin, label: 'Lucknow, India', value: 'Lucknow, Uttar Pradesh, India' },
                ].map(({ icon: Icon, value }) => (
                  <div key={value} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>
                      <Icon size={14} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{value}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', transition: 'color 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
                    aria-label="Social link"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '1.25rem', padding: '2.5rem' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>We&apos;ll get back to you within 24 hours.</p>
                  <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Honeypot */}
                  <input name="website" value={form.website} onChange={handle} style={{ display: 'none' }} tabIndex={-1} aria-hidden />

                  {[
                    { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your name' },
                    { name: 'email', label: 'Email *', type: 'email', placeholder: 'your@email.com' },
                    { name: 'phone', label: 'Phone *', type: 'tel', placeholder: '+91 98765 43210' },
                  ].map(f => (
                    <div key={f.name}>
                      <label htmlFor={`contact-${f.name}`} style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{f.label}</label>
                      <input
                        id={`contact-${f.name}`}
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name as keyof typeof form]}
                        onChange={handle}
                        required
                        style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'var(--color-text-primary)', fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="contact-service" style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Select Service *</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={form.service}
                      onChange={handle}
                      required
                      style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: form.service ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontSize: '0.85rem', outline: 'none' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                    >
                      <option value="" disabled>Choose a service...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={form.message}
                      onChange={handle}
                      required
                      style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'var(--color-text-primary)', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                    />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '0.5rem', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map card */}
          <div style={{ marginTop: '4rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '1.25rem', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '280px' }}>
              <Image src="/images/map-placeholder.jpg" alt="KPDS Studio location map" fill style={{ objectFit: 'cover' }} sizes="1200px" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>Visit Our Studio</p>
                <a
                  href="https://maps.google.com/?q=Lucknow,Uttar+Pradesh,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
