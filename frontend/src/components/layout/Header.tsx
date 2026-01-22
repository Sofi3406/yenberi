'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { authService } from '@/services/authService';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = authService.getCurrentUser();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about-silte', label: t('nav.about') },
    { href: '/about-slma', label: t('nav.slma') },
    { href: '/woredas', label: 'Woredas' },
    { href: '/membership', label: t('nav.membership') },
    { href: '/events', label: t('nav.events') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/donate', label: t('nav.donate') },
  ];

  // Add admin area link if current user is admin
  if (authService.isAdmin()) {
    navItems.push({ href: '/admin/dashboard', label: 'Admin' });
  }

  const languageOptions = [
    { code: 'en', label: 'EN' },
    { code: 'am', label: 'አማ' },
    { code: 'silt', label: 'ስል' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo-link">
          <div className="header-logo">
            <span>SL</span>
          </div>
          <div className="header-logo-text">
            <h1 className="site-title">Silte Lmat Mehber</h1>
            <p className="site-subtitle">{t('hero.subtitle')}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Language & Auth */}
        <div className="header-controls">
          {/* Language Switcher */}
          <div className="language-switcher">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => setLanguage(option.code as any)}
                className={`language-btn ${language === option.code ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          {user ? (
            <div className="user-menu">
              <button className="user-btn">
                <span>👤</span>
                <span>{user.name.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link href="/auth/login" className="nav-link">
                {t('nav.login')}
              </Link>
              <Link href="/auth/register" className="btn btn-primary">
                {t('nav.register')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="mobile-auth-buttons">
                <Link
                  href="/auth/login"
                  className="btn btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;