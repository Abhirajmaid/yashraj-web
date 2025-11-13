'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
];

type AdminAuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within the AdminLayout provider');
  }

  return context;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginRoute = pathname?.startsWith('/admin/login') ?? false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/admin/dashboard');
      } catch (firebaseError) {
        const message =
          firebaseError instanceof Error
            ? firebaseError.message
            : 'We could not sign you in. Check the credentials and try again.';
        throw new Error(message);
      }
    },
    [router]
  );

  const signOut = useCallback(() => {
    return firebaseSignOut(auth).then(() => router.replace('/admin/login'));
  }, [router]);

  const signUp = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/admin/dashboard');
    },
    [router]
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user && !isLoginRoute) {
      router.replace('/admin/login');
    }
  }, [isLoading, user, isLoginRoute, router]);

  const activeHref = useMemo(
    () => navItems.find((item) => pathname?.startsWith(item.href))?.href,
    [pathname]
  );

  const contextValue = useMemo<AdminAuthContextValue>(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [isLoading, signIn, signOut, signUp, user]
  );

  if (isLoginRoute) {
    return <AdminAuthContext.Provider value={contextValue}>{children}</AdminAuthContext.Provider>;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/60">
        <span className="text-sm uppercase tracking-[0.3em]">Loading admin console…</span>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={contextValue}>
      <div className="flex min-h-screen bg-[#050505] text-white">
        <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#080808] px-6 py-8">
          <div className="space-y-1">
            <p className="text-xl font-semibold">Yashraj Admin</p>
            <p className="text-xs text-white/40">{user?.email ?? 'Waiting for user...'}</p>
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
            onClick={signOut}
            className="mt-auto rounded-md border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:border-white hover:text-white"
          >
            Sign out
          </button>
        </aside>

        <main className="flex-1 bg-gradient-to-br from-[#0a0a0a] via-[#090909] to-[#050505] p-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </AdminAuthContext.Provider>
  );
}

