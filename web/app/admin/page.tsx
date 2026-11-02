import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdminApp from '@/components/admin/AdminApp';
import { hasSession } from '@/lib/admin/auth';
import { getGallery } from '@/lib/gallery/store';

export const metadata: Metadata = { title: 'Gallery' };

// Reads the session cookie and the live gallery, so never prerender.
export default async function AdminPage() {
  if (!(await hasSession())) redirect('/admin/login');
  return <AdminApp initial={await getGallery()} />;
}
