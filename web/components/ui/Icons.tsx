import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.6 21v-8.2h2.8l.45-3.3H13.6V7.4c0-.95.3-1.6 1.65-1.6h1.7V2.85A21 21 0 0 0 14.5 2.7c-2.5 0-4.2 1.5-4.2 4.3v2.5H7.5v3.3h2.8V21h3.3Z" />
    </svg>
  );
}

export function YoutubeIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z" />
    </svg>
  );
}

export function PhoneIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
    </svg>
  );
}

export function MailIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v.4l-9 5.6-9-5.6v-.4Zm0 3.1V18.5A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5V8.6l-8.47 5.3a1 1 0 0 1-1.06 0L3 8.6Z" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.1 6.1 12.2 6.4 12.5a.8.8 0 0 0 1.2 0C12.9 21.2 19 14.1 19 9a7 7 0 0 0-7-7Zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" />
    </svg>
  );
}

export function StarIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" />
    </svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}
