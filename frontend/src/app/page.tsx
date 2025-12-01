'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      title: 'Community Network',
      description: 'Connect with Silte community members worldwide.',
      emoji: '👥',
    },
    {
      title: 'Cultural Events',
      description: 'Participate in traditional festivals and gatherings.',
      emoji: '🎉',
    },
    {
      title: 'Heritage Gallery',
      description: 'Explore photos and videos of Silte culture.',
      emoji: '🖼️',
    },
    {
      title: 'Development Projects',
      description: 'Support community development initiatives.',
      emoji: '❤️',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <div className="hero-buttons">
              <Link href="/auth/register" className="btn btn-primary btn-lg">
                {t('hero.cta.register')} →
              </Link>
              <Link href="/about-silte" className="btn btn-outline btn-lg">
                {t('hero.cta.learn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Join SLMA?</h2>
            <p className="section-description">
              Be part of a vibrant community dedicated to preserving our heritage
              while building a better future for all Silte people.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.emoji}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Make a Difference?</h2>
          <p className="cta-description">
            Join thousands of Silte community members who are preserving our heritage
            and building our future together.
          </p>
          <div className="cta-buttons">
            <Link href="/auth/register" className="btn btn-white">
              Become a Member
            </Link>
            <Link href="/donate" className="btn btn-outline-white">
              Support Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}