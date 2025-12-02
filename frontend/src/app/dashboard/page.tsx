'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { authService } from '@/services/authService';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Award, 
  Settings, 
  Bell, 
  FileText,
  LogOut,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
    } else {
      // Simulate fetching user data
      const userWithDetails = {
        ...currentUser,
        name: currentUser.name || 'User',
        email: currentUser.email || 'user@example.com',
        role: currentUser.role || 'member',
        language: currentUser.language || 'en',
        emailVerified: currentUser.emailVerified || true,
        membership: {
          status: 'active',
          type: 'premium',
          membershipId: `SLMA-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          since: '2024'
        }
      };
      setUser(userWithDetails);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const stats = [
    { 
      label: 'Membership Status', 
      value: user.membership.status.charAt(0).toUpperCase() + user.membership.status.slice(1), 
      emoji: '✅', 
      icon: <Award className="w-6 h-6 text-green-600" />
    },
    { 
      label: 'Member Since', 
      value: user.membership.since, 
      emoji: '📅', 
      icon: <Calendar className="w-6 h-6 text-blue-600" />
    },
    { 
      label: 'Events Attended', 
      value: '5', 
      emoji: '👥', 
      icon: <Users className="w-6 h-6 text-purple-600" />
    },
    { 
      label: 'Total Donations', 
      value: 'ETB 2,500', 
      emoji: '❤️', 
      icon: <DollarSign className="w-6 h-6 text-orange-600" />
    },
  ];

  const quickActions = [
    { label: 'Edit Profile', icon: <Settings className="w-5 h-5" />, action: () => router.push('/profile/edit') },
    { label: 'Notifications', icon: <Bell className="w-5 h-5" />, action: () => router.push('/notifications') },
    { label: 'My Events', icon: <Calendar className="w-5 h-5" />, action: () => router.push('/events/my') },
    { label: 'Documents', icon: <FileText className="w-5 h-5" />, action: () => router.push('/documents') }
  ];

  const recentActivities = [
    { text: 'Updated profile information', time: '2 hours ago', icon: <Settings /> },
    { text: 'Registered for Cultural Festival', time: '1 day ago', icon: <Calendar /> },
    { text: 'Made a donation to Education Fund', time: '3 days ago', icon: <DollarSign /> },
    { text: 'Joined Worabe community group', time: '1 week ago', icon: <MapPin /> }
  ];

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
            <p className="dashboard-subtitle">Here's what's happening with your SLMA account</p>
          </div>
          <div className="membership-id-card">
            <div className="id-card-content">
              <div className="id-avatar">
                <span>🏆</span>
              </div>
              <div className="id-info">
                <p className="id-label">Membership ID</p>
                <p className="id-value">{user.membership.membershipId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            {/* Left Column - Stats & Membership */}
            <div className="left-column">
              {/* Stats Grid */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-content">
                      <div className="stat-emoji">{stat.emoji}</div>
                      <div className="stat-info">
                        <p className="stat-label">{stat.label}</p>
                        <p className="stat-value">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Membership Card */}
              <div className="membership-card">
                <h2 className="membership-card-title">Your Membership</h2>
                <div className="membership-details">
                  <div className="membership-header">
                    <div className="membership-info">
                      <h3>
                        {user.membership.type ? user.membership.type.charAt(0).toUpperCase() + user.membership.type.slice(1) : 'General'} Member
                      </h3>
                      <p className="membership-status">
                        Status: <span className={`status-${user.membership.status}`}>
                          {user.membership.status ? user.membership.status.charAt(0).toUpperCase() + user.membership.status.slice(1) : 'Pending'}
                        </span>
                      </p>
                    </div>
                    <button className="renew-button">
                      {user.membership.status === 'active' ? 'Renew Membership' : 'Activate Membership'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3 className="actions-title">Quick Actions</h3>
                <div className="actions-grid">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index} 
                      className="action-button"
                      onClick={action.action}
                    >
                      <div className="action-icon">{action.icon}</div>
                      <div className="action-label">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Profile & Activity */}
            <div className="right-column">
              {/* Profile Summary */}
              <div className="profile-summary">
                <h2 className="profile-title">Profile Summary</h2>
                <div className="profile-header">
                  <div className="profile-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="profile-info">
                    <h3>{user.name}</h3>
                    <p className="profile-email">{user.email}</p>
                    <p className="profile-role">
                      {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member'} Member
                    </p>
                  </div>
                </div>
                
                <div className="profile-details">
                  <div className="profile-detail">
                    <span className="detail-label">Email Verified</span>
                    <span className={`detail-value ${user.emailVerified ? 'verified' : 'pending'}`}>
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="profile-detail">
                    <span className="detail-label">Language</span>
                    <span className="detail-value">
                      {user.language === 'en' ? 'English' : 
                       user.language === 'am' ? 'Amharic' : 'Silte'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="logout-button"
                >
                  <LogOut className="inline w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>

              {/* Recent Activity */}
              <div className="recent-activity">
                <h3 className="activity-title">Recent Activity</h3>
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {activity.icon}
                      </div>
                      <div className="activity-content">
                        <p className="activity-text">{activity.text}</p>
                        <p className="activity-time">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}