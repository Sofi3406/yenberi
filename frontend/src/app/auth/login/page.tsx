'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { authService } from '@/services/authService';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <Link href="/" className="login-logo-link">
            <div className="login-logo">
              <span className="login-logo-text">SL</span>
            </div>
            <div className="login-organization">
              <h1 className="login-title">Silte Ləmat Mehber</h1>
              <p className="login-subtitle">{t('hero.subtitle')}</p>
            </div>
          </Link>
          
          <h2 className="login-heading">
            {t('auth.login.title')}
          </h2>
          <p className="login-description">
            Welcome back to the SLMA community
          </p>
        </div>

        {/* Form */}
        <div className="login-form-container">
          {error && (
            <div className="login-error">
              <div className="error-content">
                <AlertCircle className="error-icon" />
                <p className="error-text">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>
              <div className="input-with-icon">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="password-header">
                <label className="form-label">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="forgot-password"
                >
                  {t('auth.forgot.password')}
                </Link>
              </div>
              <div className="input-with-icon">
                <Lock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="button-icon" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">
                <span>Or</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="register-link-container">
              <p className="register-text">
                {t('auth.no.account')}{' '}
                <Link
                  href="/auth/register"
                  className="register-link"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Guest Access */}
            <div className="guest-access">
              <p className="guest-text">
                Want to explore first?{' '}
                <Link
                  href="/"
                  className="guest-link"
                >
                  Continue as guest
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="login-help">
          <div className="help-container">
            <h3 className="help-title">Need Help?</h3>
            <p className="help-text">
              Contact support at{' '}
              <a href="mailto:support@slma.org" className="help-link">
                support@slma.org
              </a>{' '}
              or call{' '}
              <a href="tel:+251123456789" className="help-link">
                +251 123 456 789
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}