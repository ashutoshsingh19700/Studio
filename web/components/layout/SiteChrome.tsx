'use client';

import { usePathname } from 'next/navigation';

/** Public header/footer wrap every page except the admin area, which has its own shell. */
export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const bare = usePathname().startsWith('/admin');
  return (
    <>
      {!bare && header}
      <main>{children}</main>
      {!bare && footer}
    </>
  );
}
