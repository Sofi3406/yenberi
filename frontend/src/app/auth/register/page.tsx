'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

// Woredas data
const woredas = [
  { id: '', name: 'Select your woreda' },
  { id: 'worabe', name: 'Worabe' },
  { id: 'hulbarag', name: 'Hulbarag' },
  { id: 'sankura', name: 'Sankura' },
  { id: 'alicho', name: 'Alicho' },
  { id: 'silti', name: 'Silti' },
  { id: 'dalocha', name: 'Dalocha' },
  { id: 'lanforo', name: 'Lanforo' },
  { id: 'east-azernet-berbere', name: 'East Azernet Berbere' },
  { id: 'west-azernet-berbere', name: 'West Azernet Berbere' },
];

const RegistrationForm = () => {
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    woreda: '',
    language: language,
    agreeToTerms: false,
  });

  // Update language when context changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, language: language }));
  }, [language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.woreda) {
      newErrors.woreda = 'Please select your woreda';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registration logic here
      console.log('Registration data:', formData);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        woreda: '',
        language: language,
        agreeToTerms: false,
      });
      
      setErrors({});
      alert('Registration successful!');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      {/* Form validation summary */}
      {errors.submit && (
        <div className="validation-summary">
          <p className="validation-summary-title">Error</p>
          <p className="error-message">{errors.submit}</p>
        </div>
      )}
      
      {/* Name field */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? 'input-error' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      {/* Email field */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'input-error' : ''}`}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      {/* Password field */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password-field-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field ${errors.password ? 'input-error' : ''}`}
            placeholder="Create a password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      {/* Confirm Password field */}
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <div className="password-field-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      
      {/* Phone field */}
      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`input-field ${errors.phone ? 'input-error' : ''}`}
          placeholder="+251 9XX XXX XXX"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
      
      {/* Woreda select field */}
      <div className="form-group">
        <label htmlFor="woreda" className="form-label">
          Woreda
        </label>
        <div className="woreda-select-container">
          <select
            id="woreda"
            name="woreda"
            value={formData.woreda}
            onChange={handleChange}
            className={`input-field select-field ${errors.woreda ? 'input-error' : ''}`}
          >
            {woredas.map(woreda => (
              <option 
                key={woreda.id} 
                value={woreda.id}
                className="select-option"
                disabled={woreda.id === ''}
              >
                {woreda.name}
              </option>
            ))}
          </select>
          <ChevronDown className="woreda-select-icon" size={16} />
        </div>
        {errors.woreda && <span className="error-message">{errors.woreda}</span>}
      </div>
      
      {/* Terms and conditions checkbox */}
      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="checkbox-input"
          />
          <label htmlFor="agreeToTerms" className="checkbox-label">
            I agree to the{' '}
            <a href="/terms" className="checkbox-link">Terms and Conditions</a>{' '}
            and{' '}
            <a href="/privacy" className="checkbox-link">Privacy Policy</a>
          </label>
        </div>
        {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
      </div>
      
      {/* Submit button */}
      <button
        type="submit"
        className={`submit-button ${isLoading ? 'button-loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Register'}
      </button>
    </form>
  );
};

export default RegistrationForm;