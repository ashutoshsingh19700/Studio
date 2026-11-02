'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { api } from './client';

export default function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/login', { method: 'POST', json: { password } });
      router.replace('/admin');
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  if (!configured) {
    return (
      <div className="a-notice" role="alert">
        <strong>Admin is not set up yet.</strong>
        <p>
          Create a file called <code>.env.local</code> in the <code>web</code> folder containing
          <code>ADMIN_PASSWORD=your-long-password</code> (8+ characters), then restart the server.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="a-form" noValidate>
      <label className="a-field">
        <span>Password</span>
        <input
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? 'login-error' : undefined}
        />
      </label>
      {error && (
        <p id="login-error" className="a-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="a-btn a-btn--primary a-btn--block" disabled={busy || !password}>
        {busy ? <LoaderCircle className="a-spin" /> : null} Sign in
      </button>
    </form>
  );
}
