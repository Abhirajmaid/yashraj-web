'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { LayoutDashboard, FolderKanban, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    if (isLoading) return;
    if (!user && !isLoginRoute) {
      router.replace('/admin/login');
    }
  }, [isLoading, user, isLoginRoute, router]);

  const activeHref = useMemo(
    () => navItems.find((item) => pathname?.startsWith(item.href))?.href,
    [pathname]
  );

  const contextValue = useMemo<AdminAuthContextValue>(
    () => ({ user, isLoading, signIn, signUp, signOut }),
    [isLoading, signIn, signOut, signUp, user]
  );

  if (isLoginRoute) {
    return <AdminAuthContext.Provider value={contextValue}>{children}</AdminAuthContext.Provider>;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-brand-primary" />
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={contextValue}>
      <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
        {/* Mobile Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm lg:hidden">
          <h1 className="text-xl font-bold text-brand-primary">Yashraj Admin</h1>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={cn(
              'fixed inset-y-0 left-0 z-40 w-64 shrink-0 transform border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="border-b border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-brand-primary">Yashraj</h1>
                <p className="mt-1 text-sm text-gray-500">Admin Panel</p>
              </div>

              <nav className="flex-1 space-y-2 p-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                        isActive ? 'bg-brand-primary/10 font-medium text-brand-primary' : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-gray-100 p-4">
                <div className="mb-3 rounded-lg bg-gray-50 px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{user?.email ?? 'Admin'}</p>
                  <p className="mt-1 text-xs text-gray-500">Authenticated</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                  }}
                  className="flex w-full items-center rounded-lg px-4 py-2 text-brand-primary transition hover:bg-brand-primary/10"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Close menu"
            />
          )}

          <main className="min-h-0 flex-1 overflow-y-auto lg:ml-0">
            <div className="p-4 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </AdminAuthContext.Provider>
  );
}
