'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { CalendarDays } from 'lucide-react';

const serviceOptions = [
  'Wedding Photography', 'Portrait Photography', 'Product Photography',
  'Family & Events', 'Fashion Photography', 'Commercial Shoots', 'Studio Rental',
];

function BookForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    service: params.get('service')?.replace(/-/g, ' ') || '',
    date: '', timeSlot: '', location: '', message: '', website: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return;
    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'BOOKING' }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      toast.success('Booking request sent! We\'ll confirm shortly.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'var(--color-bg-dark)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    color: 'var(--color-text-primary)',
    fontSize: '0.85rem', outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem',
    color: 'var(--color-gold)', letterSpacing: '0.12em',
    marginBottom: '0.4rem', textTransform: 'uppercase',
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📸</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
          Booking Request Sent!
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Thank you {form.name}! We&apos;ll review your request and get back to you within 24 hours to confirm your session.
        </p>
        <button className="btn-outline-gold" onClick={() => setSent(false)}>
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <input name="website" value={form.website} onChange={handle} style={{ display: 'none' }} tabIndex={-1} aria-hidden />

      {/* Row: name + email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="book-name" style={labelStyle}>Full Name *</label>
          <input id="book-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handle} required style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
        </div>
        <div>
          <label htmlFor="book-email" style={labelStyle}>Email *</label>
          <input id="book-email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handle} required style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
        </div>
      </div>

      {/* Row: phone + service */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="book-phone" style={labelStyle}>Phone *</label>
          <input id="book-phone" name="phone" type="tel" placeholder="98765 43210" value={form.phone} onChange={handle} required style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
        </div>
        <div>
          <label htmlFor="book-service" style={labelStyle}>Service *</label>
          <select id="book-service" name="service" value={form.service} onChange={handle} required style={{ ...inputStyle, color: form.service ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}>
            <option value="" disabled>Select service…</option>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Row: date + time slot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="book-date" style={labelStyle}>Preferred Date</label>
          <div style={{ position: 'relative' }}>
            <input id="book-date" name="date" type="date" min={today} value={form.date} onChange={handle} style={{ ...inputStyle, paddingRight: '2.5rem' }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
            <CalendarDays size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
          </div>
        </div>
        <div>
          <label htmlFor="book-slot" style={labelStyle}>Time Slot</label>
          <select id="book-slot" name="timeSlot" value={form.timeSlot} onChange={handle} style={{ ...inputStyle, color: form.timeSlot ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}>
            <option value="" disabled>Select slot…</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="book-location" style={labelStyle}>Event Location / City</label>
        <input id="book-location" name="location" type="text" placeholder="e.g. Lucknow" value={form.location} onChange={handle} style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="book-message" style={labelStyle}>Additional Details</label>
        <textarea id="book-message" name="message" rows={4} placeholder="Tell us about your event or any special requirements…" value={form.message} onChange={handle}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
      </div>

      <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '0.5rem', justifyContent: 'center', fontSize: '0.85rem', padding: '0.8rem', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Submitting…' : 'Confirm Booking →'}
      </button>
    </form>
  );
}

export default function BookPage() {
  return (
    <section className="section-dark" style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container-site" style={{ maxWidth: '780px' }}>
        <p className="eyebrow" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>BOOK A SESSION</p>
        <h1 className="heading-display" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          Let&apos;s Make it Happen.
        </h1>
        <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '3rem', lineHeight: 1.7 }}>
          Fill in the form below and we&apos;ll get back to you within 24 hours to confirm your session.
        </p>
        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '1.25rem', padding: '2.5rem' }}>
          <Suspense fallback={<p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>}>
            <BookForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
