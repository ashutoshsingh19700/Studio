'use client';

import { useId, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { submitEnquiry } from '@/lib/api';

export const SERVICE_OPTIONS = [
  'Wedding Photography',
  'Portrait Photography',
  'Product Photography',
  'Family & Events',
  'Fashion Photography',
  'Commercial Shoots',
  'Cinematic Films',
  'Photo Albums',
  'Editing & Retouching',
  'Studio Rentals',
] as const;

const SLUG_TO_OPTION: Record<string, (typeof SERVICE_OPTIONS)[number]> = {
  wedding: 'Wedding Photography',
  portrait: 'Portrait Photography',
  product: 'Product Photography',
  'family-events': 'Family & Events',
  fashion: 'Fashion Photography',
  commercial: 'Commercial Shoots',
};

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z
    .string()
    .trim()
    .refine((v) => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')), 'Please enter a valid 10-digit mobile number'),
  service: z.string().optional(),
  message: z.string().trim().max(1000, 'Please keep it under 1000 characters').optional(),
  // honeypot: real people never see or fill this
  website: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const id = useId();
  const params = useSearchParams();
  const preset = SLUG_TO_OPTION[params.get('service') ?? ''] ?? '';
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', service: preset, message: '', website: '' },
  });

  const service = useWatch({ control, name: 'service' });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // bot
    try {
      await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.service || undefined,
        message: values.message || undefined,
      });
      setDone(true);
      toast.success('Thank you! We will get back to you shortly.');
    } catch {
      toast.error('Something went wrong. Please try again or call us.');
    }
  };

  if (done) {
    return (
      <div className="form-done" role="status">
        <CheckCircle2 size={40} color="var(--gold)" aria-hidden="true" />
        <h2>Message sent</h2>
        <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
        <button
          type="button"
          className="btn btn--peach"
          onClick={() => {
            reset();
            setDone(false);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const err = (key: keyof FormValues) => errors[key]?.message as string | undefined;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor={`${id}-name`} className="sr-only">
          Your name
        </label>
        <input
          id={`${id}-name`}
          className="field"
          placeholder="Your Name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {err('name') && <p className="field-error">{err('name')}</p>}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="sr-only">
          Your email
        </label>
        <input
          id={`${id}-email`}
          className="field"
          type="email"
          inputMode="email"
          placeholder="Your Email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {err('email') && <p className="field-error">{err('email')}</p>}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="sr-only">
          Your phone number
        </label>
        <input
          id={`${id}-phone`}
          className="field"
          type="tel"
          inputMode="tel"
          placeholder="Your Phone"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          {...register('phone')}
        />
        {err('phone') && <p className="field-error">{err('phone')}</p>}
      </div>

      <div className="field-wrap">
        <label htmlFor={`${id}-service`} className="sr-only">
          Select a service
        </label>
        <select
          id={`${id}-service`}
          className={`field${service ? ' has-value' : ''}`}
          {...register('service')}
        >
          <option value="">Select Service</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="sr-only">
          Your message
        </label>
        <textarea
          id={`${id}-message`}
          className="field"
          placeholder="Your Message"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {err('message') && <p className="field-error">{err('message')}</p>}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label>
          Leave this empty
          <input tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <button type="submit" className="btn btn--peach btn--block" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send Message'} {!isSubmitting && <ArrowRight />}
      </button>
    </form>
  );
}
