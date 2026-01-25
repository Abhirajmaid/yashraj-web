'use client';

import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../layout';

type AuthMode = 'signin' | 'signup';

export default function AdminAuthPage() {
  const router = useRouter();
  const { user, isLoading, signIn, signUp } = useAdminAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignUp = mode === 'signup';

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/admin/dashboard');
    }
  }, [isLoading, user, router]);

  const isSubmitDisabled = useMemo(() => {
    const email = formValues.email.trim();
    const password = formValues.password.trim();
    const confirm = formValues.confirmPassword.trim();
    if (!email || !password) return true;
    if (isSignUp && (password.length < 6 || password !== confirm)) return true;
    return false;
  }, [formValues, isSignUp]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const email = formValues.email.trim();
    const password = formValues.password.trim();
    if (!email || !password) {
      setFormError('Enter your email and password to continue.');
      return;
    }
    if (isSignUp && password !== formValues.confirmPassword.trim()) {
      setFormError('Passwords do not match.');
      return;
    }
    try {
      setIsSubmitting(true);
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Unable to authenticate. Please check your details and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((c) => (c === 'signin' ? 'signup' : 'signin'));
    setFormError(null);
    setFormValues((c) => ({ ...c, password: '', confirmPassword: '' }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-primary/5 via-white to-brand-secondary/30 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border-0 bg-white shadow-xl">
        <div className="space-y-1 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Yashraj Admin</h1>
          <p className="text-sm text-gray-500">
            {isSignUp ? 'Create an account to access the admin panel.' : 'Sign in to access the admin panel.'}
          </p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formValues.email}
                onChange={(e) => setFormValues((c) => ({ ...c, email: e.target.value }))}
                placeholder="admin@yashraj.com"
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formValues.password}
                onChange={(e) => setFormValues((c) => ({ ...c, password: e.target.value }))}
                placeholder="••••••••"
                minLength={6}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required={isSignUp}
                  value={formValues.confirmPassword}
                  onChange={(e) => setFormValues((c) => ({ ...c, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  minLength={6}
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
            )}
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            {!formError && (
              <p className="text-xs text-gray-500">Access is secured via Firebase Authentication.</p>
            )}
            <button
              type="submit"
              disabled={isSubmitDisabled || isSubmitting}
              className="w-full rounded-md bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (isSignUp ? 'Creating account…' : 'Signing in…') : isSignUp ? 'Sign up' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-xs font-semibold uppercase tracking-widest text-gray-500 transition hover:text-gray-900"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
