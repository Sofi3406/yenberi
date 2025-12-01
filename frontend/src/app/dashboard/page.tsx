'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router instead of window.location
import { useLanguage } from '@/contexts/LanguageContext';
import { authService } from '@/services/authService';

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const user = authService.getCurrentUser();

  // Use useEffect to redirect on client side only
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  // Rest of your dashboard code...
  const stats = [
    { label: 'Membership Status', value: user.membership.status, emoji: '✅', color: 'text-green-600' },
    { label: 'Member Since', value: '2024', emoji: '📅', color: 'text-blue-600' },
    { label: 'Events Attended', value: '5', emoji: '👥', color: 'text-purple-600' },
    { label: 'Total Donations', value: 'ETB 2,500', emoji: '❤️', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#D32F2F] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-white/80">Here's what's happening with your SLMA account</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">🏆</span>
                  </div>
                  <div>
                    <p className="text-sm">Membership ID</p>
                    <p className="font-mono font-bold">{user.membership.membershipId || 'SLMA-2024-0001'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{stat.emoji}</div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Membership Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Membership</h2>
              <div className="bg-gradient-to-r from-[#e8f5e9] to-[#ffebee] rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.membership.type ? user.membership.type.charAt(0).toUpperCase() + user.membership.type.slice(1) : 'General'} Member
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Status: <span className={`font-semibold ${user.membership.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {user.membership.status ? user.membership.status.charAt(0).toUpperCase() + user.membership.status.slice(1) : 'Pending'}
                      </span>
                    </p>
                  </div>
                  <button className="bg-[#2E7D32] hover:bg-[#388e3c] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 mt-4 md:mt-0">
                    {user.membership.status === 'active' ? 'Renew Membership' : 'Activate Membership'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#D32F2F] flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member'} Member
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Verified</span>
                    <span className={user.emailVerified ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold">
                      {user.language === 'en' ? 'English' : 
                       user.language === 'am' ? 'Amharic' : 'Silte'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    authService.logout();
                    router.push('/');
                  }}
                  className="w-full border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#e8f5e9] font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}