import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Logo from '@/components/layout/Logo';
import LoginForm from '@/components/admin/LoginForm';
import { hasSession, isConfigured } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage() {
  if (await hasSession()) redirect('/admin');

  return (
    <main className="a-login">
      <div className="a-login__card">
        <Logo />
        <h1>Studio admin</h1>
        <p className="a-muted">Sign in to manage the portfolio photos, videos and categories.</p>
        <LoginForm configured={isConfigured()} />
        <Link href="/" className="a-link">
          ← Back to website
        </Link>
      </div>
    </main>
  );
}
