// components/AuthWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { authService } from '@/services/authService';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = authService.getToken();
    const user = authService.getCurrentUser();
    if (!token && user) {
      localStorage.removeItem('slma_user');
    }
    if (token && !user) {
      localStorage.removeItem('slma_token');
    }
    setIsAuthenticated(!!token && !!user);
    setIsLoading(false);
  }, [pathname]); // Re-check on route change

  useEffect(() => {
    if (isLoading) return;

    const isRegisterRoute = pathname.startsWith('/auth/register');
    const isPublicRoute = pathname === '/' || pathname.startsWith('/auth');

    if (isAuthenticated && isRegisterRoute) {
      router.replace('/dashboard');
      return;
    }

    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Landing page should show only home content (no header/footer)
  const isLandingPage = pathname === '/';
  const isAuthRoute = pathname.startsWith('/auth');
  const isAdminRoute = pathname.startsWith('/admin');
  const shouldShowHeader = !isLandingPage && !isAuthRoute;
  const shouldShowFooter = isAuthenticated && !isLandingPage && !isAuthRoute;
  const showAdminBar = isAuthenticated && isAdminRoute && authService.isAdmin();

  const handleLogout = () => {
    authService.logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {isLandingPage && (
        <div className="landing-banner" role="img" aria-label="Header Banner"></div>
      )}
      {shouldShowHeader && <Header />}
      {showAdminBar && (
        <div className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              Admin Session
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Link href="/admin/dashboard" className="text-xs sm:text-sm text-slate-200 hover:text-white whitespace-nowrap">
                Admin Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <main>{children}</main>
      {shouldShowFooter && <Footer />}
    </>
  );
}