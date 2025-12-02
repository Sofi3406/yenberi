'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Heart, 
  Lock, 
  Shield, 
  CheckCircle,
  Globe,
  BookOpen,
  Users,
  Target
} from 'lucide-react';

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
    anonymous: false
  });

  const donationMethods = [
    {
      name: 'Credit/Debit Card',
      description: 'Secure online payment with Visa, Mastercard, or American Express',
      icon: <CreditCard className="w-6 h-6" />,
      details: 'Processed securely via Stripe'
    },
    {
      name: 'Mobile Money',
      description: 'Quick payment using Ethiopian mobile money services',
      icon: <Smartphone className="w-6 h-6" />,
      details: 'M-Pesa, CBE Birr, and other local providers'
    },
    {
      name: 'Bank Transfer',
      description: 'Direct bank transfer to SLMA account',
      icon: <Building className="w-6 h-6" />,
      details: 'Commercial Bank of Ethiopia\nAccount: 1000234567890'
    }
  ];

  const presetAmounts = [
    { amount: 100, label: 'ETB 100' },
    { amount: 500, label: 'ETB 500' },
    { amount: 1000, label: 'ETB 1,000' },
    { amount: 2500, label: 'ETB 2,500' },
    { amount: 5000, label: 'ETB 5,000' },
    { amount: 10000, label: 'ETB 10,000' }
  ];

  const impactProjects = [
    {
      id: 1,
      name: 'Silte Language Archive',
      description: 'Digitizing and preserving Silte language materials for future generations',
      goal: 'ETB 500,000',
      raised: 'ETB 350,000',
      progress: 70,
      badge: 'Education'
    },
    {
      id: 2,
      name: 'Youth Leadership Program',
      description: 'Training young Silte leaders with skills for community development',
      goal: 'ETB 300,000',
      raised: 'ETB 180,000',
      progress: 60,
      badge: 'Empowerment'
    },
    {
      id: 3,
      name: 'Cultural Festival 2025',
      description: 'Annual celebration of Silte heritage with music, dance, and art',
      goal: 'ETB 750,000',
      raised: 'ETB 450,000',
      progress: 60,
      badge: 'Culture'
    }
  ];

  const impactStats = [
    { number: '2,500+', label: 'Donors Supported' },
    { number: 'ETB 5M+', label: 'Funds Raised' },
    { number: '15', label: 'Projects Funded' },
    { number: '12', label: 'Woredas Impacted' }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const donationAmount = selectedAmount || customAmount;
    if (!donationAmount || donationAmount <= 0) {
      alert('Please select or enter a donation amount');
      setLoading(false);
      return;
    }

    if (!formData.fullName || !formData.email) {
      alert('Please fill in required donor information');
      setLoading(false);
      return;
    }

    try {
      // Simulate donation processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Thank you for your donation of ETB ${donationAmount}! A confirmation email has been sent to ${formData.email}.`);
      
      // Reset form
      setSelectedAmount(null);
      setCustomAmount('');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        comment: '',
        anonymous: false
      });
      
    } catch (error) {
      alert('Donation failed. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-page">
      <div className="donate-container">
        {/* Header */}
        <div className="donate-header">
          <h1 className="donate-title">Support Our Community</h1>
          <p className="donate-subtitle">
            Your donation helps preserve Silte heritage, support community development, 
            and empower future generations. Every contribution makes a difference.
          </p>
          <p className="donate-tagline">
            Together, we build a stronger Silte community.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="impact-stats">
          <h2 className="impact-title">Your Impact in Numbers</h2>
          <p className="impact-description">
            See how donations like yours have transformed our community
          </p>
          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Methods */}
        <div className="donation-methods">
          <h2 className="methods-title">Choose Your Donation Method</h2>
          <div className="methods-grid">
            {donationMethods.map((method, index) => (
              <div key={index} className="method-card">
                <div className="method-icon">
                  {method.icon}
                </div>
                <h3 className="method-name">{method.name}</h3>
                <p className="method-description">{method.description}</p>
                <div className="method-details">
                  {method.details.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Form */}
        <div className="donation-form-section">
          <h2 className="form-title">Make a Donation</h2>
          
          <form onSubmit={handleSubmit} className="donation-form">
            {/* Donation Amount */}
            <div className="donation-amounts">
              <h3 className="amounts-title">Select Donation Amount</h3>
              <div className="amounts-grid">
                {presetAmounts.map((item) => (
                  <button
                    key={item.amount}
                    type="button"
                    className={`amount-button ${selectedAmount === item.amount ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect(item.amount)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="custom-amount">
                <div className="currency-symbol">ETB</div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter custom amount"
                  className="custom-amount-input"
                  min="1"
                />
              </div>
            </div>

            {/* Donation Type */}
            <div className="donation-type">
              <h3 className="type-title">Donation Type</h3>
              <div className="type-options">
                <label className="type-option">
                  <input
                    type="radio"
                    name="donationType"
                    value="one-time"
                    checked={donationType === 'one-time'}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="type-radio"
                  />
                  <span className="type-label">One-time Donation</span>
                </label>
                <label className="type-option">
                  <input
                    type="radio"
                    name="donationType"
                    value="monthly"
                    checked={donationType === 'monthly'}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="type-radio"
                  />
                  <span className="type-label">Monthly Recurring Donation</span>
                </label>
              </div>
            </div>

            {/* Donor Information */}
            <div className="donor-info">
              <h3 className="donor-title">Your Information</h3>
              <div className="info-grid">
                <div className="form-group">
                  <label className="form-label required">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+251 ___ ___ ___"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Address (Optional)</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Comment (Optional)</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Add a message with your donation"
                  rows="3"
                />
              </div>
              
              <label className="type-option" style={{ marginTop: '1rem' }}>
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="type-label">Make this donation anonymous</span>
              </label>
            </div>

            {/* Privacy Checkbox */}
            <div className="privacy-checkbox">
              <input
                type="checkbox"
                id="privacy"
                className="checkbox-input"
                required
              />
              <label htmlFor="privacy" className="checkbox-label">
                I agree to the{' '}
                <a href="/privacy" className="privacy-link">Privacy Policy</a>{' '}
                and consent to SLMA contacting me regarding my donation.
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
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  <span>Donate Now</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          <h2 className="projects-title">Projects You Can Support</h2>
          <div className="projects-grid">
            {impactProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#6b7280',
                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}></div>
                  <span className="project-badge">{project.badge}</span>
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-stats">
                    <span>Goal: {project.goal}</span>
                    <span>Raised: {project.raised}</span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text" style={{ textAlign: 'right', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    {project.progress}% funded
                  </div>
                  
                  <button 
                    className="project-button"
                    onClick={() => {
                      setSelectedAmount(500);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Support This Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="security-section">
          <h2 className="security-title">Secure & Transparent</h2>
          <div className="security-badges">
            <div className="security-badge">
              <Lock className="security-icon w-4 h-4" />
              256-bit SSL Encryption
            </div>
            <div className="security-badge">
              <Shield className="security-icon w-4 h-4" />
              PCI DSS Compliant
            </div>
            <div className="security-badge">
              <CheckCircle className="security-icon w-4 h-4" />
              Tax Deductible Receipts
            </div>
            <div className="security-badge">
              <Globe className="security-icon w-4 h-4" />
              Global Payment Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}