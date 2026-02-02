// components/AuthWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { authService } from '@/services/authService';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    setIsAuthenticated(!!user);
    setIsLoading(false);
  }, [pathname]); // Re-check on route change

  // Always show Header and Footer for authenticated users
  // Only show on landing page (/) if not authenticated? Wait, you want opposite.
  // You want: Hide Header/Footer ONLY on landing page when not logged in
  // Actually you said: "in the landing page only home.jsx should be visible"
  
  const isLandingPage = pathname === '/';
  const shouldShowHeaderFooter = !isLandingPage || isAuthenticated;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <main>{children}</main>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}