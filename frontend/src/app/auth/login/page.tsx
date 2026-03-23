'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, Mail, Lock, AlertCircle, Quote, Users, Target, Heart, Star, MapPin, Navigation } from 'lucide-react';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unverified = searchParams.get('unverified') === '1';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Silte motivational messages
  const motivationalMessages = [
    {
      id: 1,
      icon: <Quote className="w-5 h-5" />,
      text: "እማናትን አክብሮ፣ ተከታይን አስተምሮ",
      translation: "Respect the elders, teach the followers",
      type: "wisdom"
    },
    {
      id: 2,
      icon: <Users className="w-5 h-5" />,
      text: "ሁሉም በአንድ ቤት የተገነባ፣ አንድም ሳይቀር",
      translation: "We are all built in one house, none excluded",
      type: "unity"
    },
    {
      id: 3,
      icon: <Target className="w-5 h-5" />,
      text: "Together we build, together we prosper",
      translation: "Our collective strength drives our success",
      type: "progress"
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5" />,
      text: "Our heritage is our foundation",
      translation: "Preserving culture for future generations",
      type: "heritage"
    },
    {
      id: 5,
      icon: <Star className="w-5 h-5" />,
      text: "ሰላም፣ ልማት፣ ኅብረት",
      translation: "Peace, Development, Unity",
      type: "motto"
    }
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Rotate messages every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please enter both email and password');
      }

      const data = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      
      setSuccessMessage('Login successful! Redirecting...');
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);

    } catch (err: any) {
      console.error('Login error:', err);
      setLoading(false);
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 403 && data?.code === 'EMAIL_NOT_VERIFIED') {
        setError(data.message || 'Your email has not been verified yet. Please wait for admin verification before you can use the system.');
        return;
      }
      if (err.message?.includes('Failed to fetch') || err.message?.includes('Network')) {
        setError('Cannot connect to server. Please try again.');
      } else if (status === 401 || err.message?.includes('Invalid')) {
        setError('Invalid email or password.');
      } else {
        setError(data?.message || err.message || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-page-container">
      {/* Main Login Container (unchanged) */}
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-header-content">
              <div className="login-logo">
                <span className="login-logo-text">SL</span>
              </div>
              <h1 className="login-title">Silte Lmat Mehber</h1>
              <p className="login-subtitle">Welcome back to SLMA Community</p>
            </div>
          </div>

          {/* Form */}
          <div className="login-form-container">
            {successMessage && (
              <div className="login-success-message">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            )}

            {unverified && (
              <div className="login-error-message login-error-message-warning">
                <AlertCircle className="login-error-icon" />
                <div className="login-error-content">
                  <strong>Email not verified.</strong> Your account must be verified by an admin before you can use the system. Please wait for verification or contact support.
                </div>
              </div>
            )}
            {error && (
              <div className="login-error-message">
                <AlertCircle className="login-error-icon" />
                <div className="login-error-content">
                  <p className="login-error-title">Login Error</p>
                  <p className="login-error-text">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Email Address
                </label>
                <div className="login-input-container">
                  <div className="login-input-icon">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="login-input"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="login-form-group">
                <div className="login-flex-row">
                  <label htmlFor="password" className="login-label">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="login-forgot-link"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="login-input-container">
                  <div className="login-input-icon">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="login-input"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button"
              >
                {loading ? (
                  <>
                    <div className="login-button-spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="login-button-icon" />
                    Sign In
                  </>
                )}
              </button>

              <div className="login-signup-text">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/register"  
                  className="login-signup-link"
                >
                  Sign up now
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <div className="login-footer-content">
              <p className="login-footer-text">
                Need help? Contact support at{' '}
                <a 
                  href="mailto:support@slma.org" 
                  className="login-footer-link"
                >
                  support@slma.org
                </a>
              </p>
              <p className="login-footer-copyright">
                &copy; {new Date().getFullYear()} Silte Lmat Mehber. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Messages Sidebar - Middle Section */}
      <div className="motivational-sidebar">
        <div className="motivational-header">
          <h3 className="motivational-title">
            <span className="motivational-title-icon">✨</span>
            Silte Wisdom
          </h3>
          <p className="motivational-subtitle">Inspiration from our community</p>
        </div>

        <div className="motivational-messages">
          {motivationalMessages.map((message, index) => (
            <div 
              key={message.id}
              className={`motivational-message ${index === currentMessageIndex ? 'active' : ''}`}
            >
              <div className="message-icon">
                {message.icon}
              </div>
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                <p className="message-translation">{message.translation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="motivational-dots">
          {motivationalMessages.map((_, index) => (
            <button
              key={index}
              className={`motivational-dot ${index === currentMessageIndex ? 'active' : ''}`}
              onClick={() => setCurrentMessageIndex(index)}
              aria-label={`View message ${index + 1}`}
            />
          ))}
        </div>

        <div className="motivational-community">
          <h4 className="community-title">Our Values</h4>
          <ul className="community-values">
            <li>Unity & Togetherness</li>
            <li>Cultural Preservation</li>
            <li>Mutual Support</li>
            <li>Progressive Development</li>
          </ul>
        </div>

        <div className="motivational-footer">
          <p className="motivational-footer-text">
            Join over 5,000+ Silte community members
          </p>
        </div>
      </div>

      {/* Google Map Section - Right Side */}
      <div className="map-sidebar">
        <div className="map-header">
          <div className="map-header-content">
            <MapPin className="map-header-icon" />
            <h3 className="map-title">Silte Zone - Worabe</h3>
            <p className="map-subtitle">Our Cultural Heartland</p>
          </div>
        </div>

        <div className="map-container">
          {/* Google Map Embed */}
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31734.285996335896!2d38.19823967910157!3d8.013250299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17f3657b5f2a0a45%3A0x46d06f07f9f9e8e9!2sWorabe%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Worabe, Silte Zone Map"
            />
          </div>

          <div className="map-info">
            <div className="map-info-item">
              <div className="map-info-icon">📍</div>
              <div className="map-info-content">
                <p className="map-info-label">Location</p>
                <p className="map-info-value">Worabe, Silte Zone</p>
              </div>
            </div>

            <div className="map-info-item">
              <div className="map-info-icon">🏛️</div>
              <div className="map-info-content">
                <p className="map-info-label">Capital</p>
                <p className="map-info-value">Worabe City</p>
              </div>
            </div>

            <div className="map-info-item">
              <div className="map-info-icon">👥</div>
              <div className="map-info-content">
                <p className="map-info-label">Population</p>
                <p className="map-info-value">~900,000+</p>
              </div>
            </div>

            <div className="map-info-item">
              <div className="map-info-icon">🗺️</div>
              <div className="map-info-content">
                <p className="map-info-label">Area</p>
                <p className="map-info-value">2,654 km²</p>
              </div>
            </div>
          </div>

          <div className="map-actions">
            <a
              href="https://maps.app.goo.gl/8Kv2J3Z7yQ1aXq7q8"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-button"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
            <a
              href="https://www.google.com/maps/dir//Worabe,+Ethiopia/@8.01325,38.1982397,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x17f3657b5f2a0a45:0x46d06f07f9f9e8e9!2m2!1d38.2166667!2d8.0166667!3e0?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-button secondary"
            >
              <span>Get Directions</span>
            </a>
          </div>

          <div className="map-description">
            <p>
              <strong>Worabe</strong> is the administrative capital of Silte Zone in the Southern Nations, 
              Nationalities, and Peoples' Region (SNNPR) of Ethiopia. Located approximately 172 kilometers 
              southwest of Addis Ababa, it serves as the cultural and economic center of the Silte people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}