'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import api from '@/services/api';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const woredas = [
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

const professions = [
  'medicine', 'computer_science', 'software_engineer', 'biomedical_engineer',
  'civil', 'mechanical', 'pharmacist', 'laboratory', 'midwifery', 'nursing',
  'health_officer', 'accounting', 'law', 'education', 'business', 'other',
];

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    phone: '',
    woreda: '',
    language: 'en' as 'en' | 'am' | 'silt',
    maritalStatus: '' as '' | 'single' | 'married',
    userType: '' as '' | 'student' | 'employee',
    profession: '',
    currentResident: '',
    profile: { bio: '', occupation: '', location: '' } as { bio?: string; occupation?: string; location?: string },
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    // Allow both members and admins to edit profile
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get('/auth/me');
        const u = res.data?.user;
        if (!u) throw new Error('Failed to load profile');
        setFormData({
          name: u.name || '',
          fatherName: u.fatherName || '',
          phone: u.phone || '',
          woreda: u.woreda || '',
          language: u.language || 'en',
          maritalStatus: u.maritalStatus || '',
          userType: u.userType || '',
          profession: u.profession || '',
          currentResident: u.currentResident || '',
          profile: {
            bio: u.profile?.bio || '',
            occupation: u.profile?.occupation || '',
            location: u.profile?.location || '',
          },
        });
      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message || 'Failed to load profile');
        router.push(authService.isAdmin() ? '/admin/dashboard' : '/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        profile: { ...prev.profile, [key]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        fatherName: formData.fatherName || undefined,
        phone: formData.phone,
        woreda: formData.woreda || undefined,
        language: formData.language,
        maritalStatus: formData.maritalStatus || undefined,
        userType: formData.userType || undefined,
        profession: formData.profession || undefined,
        currentResident: formData.currentResident || undefined,
        profile: formData.profile,
      };
      await authService.updateProfile(payload);
      toast.success('Profile updated successfully');
      router.push(authService.isAdmin() ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={authService.isAdmin() ? '/admin/dashboard' : '/dashboard'}
          className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Father Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Woreda</label>
            <select
              name="woreda"
              value={formData.woreda}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select woreda</option>
              {woredas.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student or Employee</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select profession</option>
              {professions.map(p => (
                <option key={p} value={p}>{p.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Resident</label>
            <input
              type="text"
              name="currentResident"
              value={formData.currentResident}
              onChange={handleChange}
              placeholder="City or area"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

        

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="en">English</option>
              <option value="am">Amharic</option>
              <option value="silt">Silte</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={authService.isAdmin() ? '/admin/dashboard' : '/dashboard'}
              className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
