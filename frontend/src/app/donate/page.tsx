'use client';

import React, { useState, useEffect } from 'react';
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
  Target,
  Upload,
  AlertCircle,
  Check
} from 'lucide-react';

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [selectedProject, setSelectedProject] = useState('General Fund');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cbe');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
    anonymous: false
  });
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // API Base URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const donationMethods = [
    {
      id: 'cbe',
      name: 'CBE Bank Transfer',
      description: 'Transfer to Commercial Bank of Ethiopia account',
      icon: <Building className="w-6 h-6" />,
      details: 'Account: 1000212203746\nName: SOFIYA YASIN\nBank: Commercial Bank of Ethiopia',
      instructions: 'Visit any CBE branch or use CBE mobile banking'
    },
    {
      id: 'telebirr',
      name: 'TeleBirr',
      description: 'Quick payment using TeleBirr mobile money',
      icon: <Smartphone className="w-6 h-6" />,
      details: 'Phone: +251930670088\nName: SOFIYA YASIN',
      instructions: 'Send money via TeleBirr app'
    },
    {
      id: 'bank-transfer',
      name: 'Other Bank Transfer',
      description: 'Transfer from any bank to our CBE account',
      icon: <CreditCard className="w-6 h-6" />,
      details: 'Account: 1000212203746\nName: SOFIYA YASIN\nBank: Commercial Bank of Ethiopia',
      instructions: 'Use your bank\'s mobile app or visit a branch'
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
      value: 'Silte Language Archive',
      description: 'Digitizing and preserving Silte language materials for future generations',
      goal: 'ETB 500,000',
      raised: 'ETB 350,000',
      progress: 70,
      badge: 'Education'
    },
    {
      id: 2,
      name: 'Youth Leadership Program',
      value: 'Youth Leadership Program',
      description: 'Training young Silte leaders with skills for community development',
      goal: 'ETB 300,000',
      raised: 'ETB 180,000',
      progress: 60,
      badge: 'Empowerment'
    },
    {
      id: 3,
      name: 'Cultural Festival 2025',
      value: 'Cultural Festival 2025',
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid file (JPEG, PNG, or PDF)');
        return;
      }
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setReceiptFile(file);
    }
  };

  const createDonation = async () => {
    const donationAmount = selectedAmount || customAmount;
    
    const donationData = {
      donor: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },
      amount: Number(donationAmount),
      donationType: donationType,
      project: selectedProject,
      comment: formData.comment,
      paymentMethod: selectedPaymentMethod,
      isAnonymous: formData.anonymous,
      metadata: {
        address: formData.address
      }
    };

    try {
      const response = await fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create donation');
      }

      return result;
    } catch (error) {
      console.error('Donation creation error:', error);
      throw error;
    }
  };

  const uploadReceipt = async (donationId) => {
    if (!receiptFile) {
      throw new Error('Please select a receipt file');
    }

    const formData = new FormData();
    formData.append('receipt', receiptFile);

    try {
      const response = await fetch(`${API_URL}/donations/${donationId}/receipt`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload receipt');
      }

      return result;
    } catch (error) {
      console.error('Receipt upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    const donationAmount = selectedAmount || customAmount;
    if (!donationAmount || donationAmount <= 0) {
      alert('Please select or enter a donation amount');
      setLoading(false);
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required donor information');
      setLoading(false);
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      setLoading(false);
      return;
    }

    try {
      // Create donation
      const donationResult = await createDonation();
      
      setCurrentDonation(donationResult.donation);
      setShowPaymentInstructions(true);
      
      setSuccessMessage(`Donation created successfully! Check your email for payment instructions. Transaction ID: ${donationResult.donation.transactionId}`);
      
      // Reset form (except for payment instructions)
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
      setReceiptFile(null);
      
    } catch (error) {
      alert(`Donation failed: ${error.message}`);
      console.error('Donation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReceiptUpload = async () => {
    if (!currentDonation) {
      alert('No donation found. Please create a donation first.');
      return;
    }

    if (!receiptFile) {
      alert('Please select a receipt file to upload');
      return;
    }

    setUploadLoading(true);

    try {
      const uploadResult = await uploadReceipt(currentDonation.id);
      
      alert('Receipt uploaded successfully! Our team will verify it within 24-48 hours.');
      
      // Reset state
      setCurrentDonation(null);
      setShowPaymentInstructions(false);
      setReceiptFile(null);
      setSuccessMessage('Thank you! Your receipt has been submitted for verification.');
      
    } catch (error) {
      alert(`Receipt upload failed: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  const getPaymentInstructions = () => {
    const method = donationMethods.find(m => m.id === selectedPaymentMethod);
    const amount = selectedAmount || customAmount;
    
    switch(selectedPaymentMethod) {
      case 'cbe':
        return {
          title: 'CBE Bank Transfer Instructions',
          steps: [
            'Visit any Commercial Bank of Ethiopia branch',
            'Fill out deposit slip with the following details:',
            `Account Number: 1000212203746`,
            `Account Name: SOFIYA YASIN`,
            `Amount: ETB ${amount}`,
            'Use your phone number or name as reference',
            'Keep the deposit slip/receipt',
            'Upload the receipt below'
          ]
        };
        
      case 'telebirr':
        return {
          title: 'TeleBirr Payment Instructions',
          steps: [
            'Open your TeleBirr app',
            'Go to Send Money',
            `Enter phone number: +251930670088`,
            `Enter amount: ETB ${amount}`,
            'Add your name in the message/note field',
            'Complete the transaction',
            'Take a screenshot of the confirmation',
            'Upload the screenshot below'
          ]
        };
        
      case 'bank-transfer':
        return {
          title: 'Bank Transfer Instructions',
          steps: [
            'Use your bank\'s mobile app or visit a branch',
            `Transfer ETB ${amount} to:`,
            `Bank: Commercial Bank of Ethiopia`,
            `Account: 1000212203746`,
            `Name: SOFIYA YASIN`,
            'Add your name as reference',
            'Save the transaction receipt/screenshot',
            'Upload it below'
          ]
        };
        
      default:
        return {
          title: 'Payment Instructions',
          steps: ['Please complete your payment and upload the receipt']
        };
    }
  };

  // Check for existing donation in localStorage on component mount
  useEffect(() => {
    const savedDonation = localStorage.getItem('lastDonation');
    const savedTransactionId = localStorage.getItem('lastTransactionId');
    
    if (savedDonation && savedTransactionId) {
      setCurrentDonation(JSON.parse(savedDonation));
      setShowPaymentInstructions(true);
    }
  }, []);

  return (
    <div className="donate-page min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Your donation helps preserve Silte heritage, support community development, 
            and empower future generations. Every contribution makes a difference.
          </p>
          <p className="text-lg text-purple-600 font-semibold">
            Together, we build a stronger Silte community.
          </p>
        </div>

        {/* Payment Instructions Modal */}
        {showPaymentInstructions && currentDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Complete Your Donation
                  </h2>
                  <button
                    onClick={() => setShowPaymentInstructions(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Important:</h3>
                      <p className="text-blue-700">
                        Please complete the payment using the instructions below, then upload your receipt.
                        Your donation will be processed only after receipt verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Donation Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-mono font-semibold">{currentDonation.transactionId}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-lg font-bold text-green-600">ETB {currentDonation.amount}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {getPaymentInstructions().title}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ol className="list-decimal pl-5 space-y-2">
                      {getPaymentInstructions().steps.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upload Payment Receipt
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    
                    {receiptFile ? (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Selected file:</p>
                        <p className="font-medium">{receiptFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(receiptFile.size / 1024).toFixed(2)} KB
                        </p>
                        <button
                          onClick={() => setReceiptFile(null)}
                          className="text-sm text-red-600 hover:text-red-800 mt-2"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600 mb-4">
                          Upload a clear photo or scan of your payment receipt
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <span className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </span>
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          Accepted: JPG, PNG, PDF (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowPaymentInstructions(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReceiptUpload}
                    disabled={uploadLoading || !receiptFile}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadLoading ? (
                      <span className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </span>
                    ) : (
                      'Submit Receipt'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Impact Stats */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Your Impact in Numbers
          </h2>
          <p className="text-center text-gray-600 mb-8">
            See how donations like yours have transformed our community
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Make a Donation
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Donation Amount */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Donation Amount
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((item) => (
                  <button
                    key={item.amount}
                    type="button"
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedAmount === item.amount
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                    onClick={() => handleAmountSelect(item.amount)}
                  >
                    <div className="font-semibold">{item.label}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 text-gray-700 font-semibold">
                  ETB
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter custom amount"
                  className="flex-1 px-4 py-3 outline-none"
                  min="1"
                />
              </div>
            </div>

            {/* Project Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Project (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {impactProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedProject === project.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-400'
                    }`}
                    onClick={() => setSelectedProject(project.value)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {project.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {project.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {project.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      Goal: {project.goal} • Raised: {project.raised}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Donation Type
              </h3>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="donationType"
                    value="one-time"
                    checked={donationType === 'one-time'}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="ml-2 text-gray-700">One-time Donation</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="donationType"
                    value="monthly"
                    checked={donationType === 'monthly'}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="ml-2 text-gray-700">Monthly Recurring</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {donationMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-400'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mr-3">
                        {method.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <div className="text-xs text-gray-500 whitespace-pre-line">
                      {method.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+251 ___ ___ ___"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment (Optional)
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a message with your donation"
                  rows="3"
                />
              </div>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="ml-2 text-gray-700">Make this donation anonymous</span>
              </label>
            </div>

            {/* Privacy Checkbox */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-purple-600 mt-1 mr-3"
                />
                <span className="text-gray-700">
                  I agree to the{' '}
                  <a href="/privacy" className="text-purple-600 hover:text-purple-800">
                    Privacy Policy
                  </a>{' '}
                  and consent to SLMA contacting me regarding my donation.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Secure & Transparent
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4">
              <Lock className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900 text-center">
                256-bit SSL Encryption
              </span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Shield className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900 text-center">
                Secure Payment Processing
              </span>
            </div>
            <div className="flex flex-col items-center p-4">
              <CheckCircle className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900 text-center">
                Tax Deductible Receipts
              </span>
            </div>
            <div className="flex flex-col items-center p-4">
              <Globe className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900 text-center">
                Ethiopian Payment Support
              </span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:donations@siltecommunity.org" className="text-purple-600 hover:text-purple-800">
              donations@siltecommunity.org
            </a>{' '}
            or call +251 93 067 0088
          </p>
          <p className="mt-2">
            All donations are processed securely. You will receive email confirmation and payment instructions.
          </p>
        </div>
      </div>
    </div>
  );
}