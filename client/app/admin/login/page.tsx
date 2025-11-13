'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
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

    if (!email || !password) {
      return true;
    }
    if (isSignUp && (password.length < 6 || password !== confirm)) {
      return true;
    }

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
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to authenticate. Please check your details and try again.';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
    setFormError(null);
    setFormValues((current) => ({ ...current, password: '', confirmPassword: '' }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111111] p-8 shadow-lg shadow-black/60">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-white">Yashraj Admin</h1>
          <p className="text-sm text-white/50">
            {isSignUp
              ? 'Create an operator account to access the console.'
              : 'Sign in with your operator credentials to manage the console.'}
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm text-white/80">
            <span className="uppercase tracking-[0.2em] text-xs text-white/40">Email</span>
            <input
              type="email"
              required
              value={formValues.email}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white/90 focus:border-white/40 focus:outline-none"
              placeholder="operator@yashraj.dev"
            />
          </label>

          <label className="block space-y-2 text-sm text-white/80">
            <span className="uppercase tracking-[0.2em] text-xs text-white/40">Password</span>
            <input
              type="password"
              required
              value={formValues.password}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, password: event.target.value }))
              }
              className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white/90 focus:border-white/40 focus:outline-none"
              placeholder="••••••••"
              minLength={6}
            />
          </label>

          {isSignUp ? (
            <label className="block space-y-2 text-sm text-white/80">
              <span className="uppercase tracking-[0.2em] text-xs text-white/40">Confirm password</span>
              <input
                type="password"
                required
                value={formValues.confirmPassword}
                onChange={(event) =>
                  setFormValues((current) => ({ ...current, confirmPassword: event.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white/90 focus:border-white/40 focus:outline-none"
                placeholder="••••••••"
                minLength={6}
              />
            </label>
          ) : null}

          {formError ? (
            <p className="text-xs text-red-400/90">{formError}</p>
          ) : (
            <p className="text-xs text-white/40">Access is secured via Firebase Authentication.</p>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled || isSubmitting}
            className="w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
          >
            {isSubmitting ? (isSignUp ? 'Creating account…' : 'Signing in…') : isSignUp ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 transition hover:text-white"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}


