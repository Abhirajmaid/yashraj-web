'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, ReactNode, useMemo, useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
];

const demoUserEmail = 'operator@yashraj.dev';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [operatorEmail, setOperatorEmail] = useState(demoUserEmail);
  const [formError, setFormError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const activeHref = useMemo(
    () => navItems.find((item) => pathname?.startsWith(item.href))?.href,
    [pathname]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!formValues.email || !formValues.password) {
      setFormError('Enter credentials to preview the admin experience.');
      return;
    }

    setOperatorEmail(formValues.email);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setFormValues({ email: '', password: '' });
    setFormError(null);
    setOperatorEmail(demoUserEmail);
  };

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111111] p-8 shadow-lg shadow-black/60">
          <header className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold text-white">Yashraj Admin</h1>
            <p className="text-sm text-white/50">
              Prototype access. Provide any credentials to explore the console.
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
              />
            </label>

            {formError ? (
              <p className="text-xs text-red-400/90">{formError}</p>
            ) : (
              <p className="text-xs text-white/40">
                Real authentication will plug in once Firewist is ready.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Enter console
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#080808] px-6 py-8">
        <div className="space-y-1">
          <p className="text-xl font-semibold">Yashraj Admin</p>
          <p className="text-xs text-white/40">{operatorEmail}</p>
        </div>

        <nav className="mt-10 space-y-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 transition ${
                activeHref === item.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleSignOut}
          className="mt-auto rounded-md border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:border-white hover:text-white"
        >
          Sign out
        </button>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-[#0a0a0a] via-[#090909] to-[#050505] p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

