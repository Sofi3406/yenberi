'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Users, BookOpen, Heart, TrendingUp, Target, Award } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      title: 'Community Network',
      description: 'Connect with Silte community members worldwide.',
      emoji: '👥',
      icon: <Users className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Cultural Events',
      description: 'Participate in traditional festivals and gatherings.',
      emoji: '🎉',
      icon: <Calendar className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Heritage Gallery',
      description: 'Explore photos and videos of Silte culture.',
      emoji: '🖼️',
      icon: <BookOpen className="w-8 h-8 text-purple-600" />
    },
    {
      title: 'Development Projects',
      description: 'Support community development initiatives.',
      emoji: '❤️',
      icon: <Heart className="w-8 h-8 text-red-600" />
    },
  ];

  const stats = [
    { number: '2,500+', label: 'Active Members' },
    { number: '45+', label: 'Annual Events' },
    { number: '12', label: 'Woredas Covered' },
    { number: '15', label: 'Community Projects' }
  ];

  const woredas = [
    'Worabe', 'Hulbarag', 'Sankura', 'Alicho', 'Silti', 'Dalocha', 
    'Lanforo', 'East Azernet', 'West Azernet'
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Silte Cultural Festival 2024',
      description: 'Annual celebration featuring traditional music, dance, and food from all woredas.',
      date: 'Dec 15, 2024',
      location: 'Worabe Stadium',
      type: 'event',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400'
    },
    {
      id: 2,
      title: 'Language Preservation Workshop',
      description: 'Training session for documenting and teaching Silte language to younger generations.',
      date: 'Nov 28, 2024',
      location: 'Community Center',
      type: 'workshop',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400'
    },
    {
      id: 3,
      title: 'Youth Leadership Summit',
      description: 'Empowering young Silte leaders with skills and networking opportunities.',
      date: 'Oct 20, 2024',
      location: 'Conference Hall',
      type: 'summit',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400'
    }
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
              <Link href="/auth/login" className="btn btn-primary btn-lg">
                {t('nav.login')} →
              </Link>
              <Link href="/about-silte" className="btn btn-outline btn-lg">
                {t('hero.cta.learn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
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

      {/* Recent Activities */}
      <section className="activities-section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Recent Activities</h2>
            <p className="section-description">
              Stay updated with our latest events, workshops, and community initiatives
            </p>
          </div>

          <div className="activities-grid">
            {recentActivities.map((activity) => (
              <Link key={activity.id} href={`/events/${activity.id}`} className="activity-card">
                <div className="activity-image">
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#6b7280',
                    backgroundImage: `url(${activity.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}></div>
                  <span className="activity-badge">{activity.type}</span>
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-meta">
                    <span className="activity-date">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </span>
                    <span className="activity-location">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Woredas Section */}
      <section className="woredas-section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Woredas</h2>
            <p className="section-description">
              Connecting communities across all nine Silte woredas
            </p>
          </div>

          <div className="woredas-grid">
            {woredas.map((woreda, index) => (
              <Link key={index} href={`/woredas/${woreda.toLowerCase().replace(' ', '-')}`} className="woreda-tag">
                {woreda}
              </Link>
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

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="section-title" style={{ color: 'white' }}>Stay Connected</h2>
            <p className="section-description" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Subscribe to our newsletter for updates on events, projects, and community news
            </p>
          </div>
          
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}