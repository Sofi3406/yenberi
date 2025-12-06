'use client';

import React, { useEffect, useState } from 'react';
import { adminApi } from '@/services/adminApi';

export default function UserListClient() {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<any>({});

  const fetchUsers = async (p = 1) => {
    try {
      setLoading(true);
      const res = await adminApi.listUsers(p, limit, search);
      setUsers(res.users || []);
      setPagination(res.pagination || {});
      setPage(p);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(1); }, []);

  const changeRole = async (id: string, role: string) => {
    await adminApi.changeRole(id, role);
    fetchUsers(page);
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await adminApi.setStatus(id, isActive);
    fetchUsers(page);
  };

  const removeUser = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    await adminApi.deleteUser(id);
    fetchUsers(page);
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name/email/phone" className="input" />
        <button onClick={() => fetchUsers(1)} className="btn">Search</button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>{u.isActive ? 'Active' : 'Inactive'}</td>
                <td className="space-x-2">
                  <button onClick={() => changeRole(u._id, u.role === 'member' ? 'woreda_admin' : 'member')} className="btn">Toggle Role</button>
                  <button onClick={() => toggleActive(u._id, !u.isActive)} className="btn">{u.isActive ? 'Deactivate' : 'Activate'}</button>
                  <button onClick={() => removeUser(u._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Page {pagination.page || page} of {pagination.pages || 1}</div>
        <div className="space-x-2">
          <button onClick={() => fetchUsers(Math.max(1, page - 1))} disabled={page <= 1 || loading} className="btn">Prev</button>
          <button onClick={() => fetchUsers((page || 1) + 1)} disabled={page >= (pagination.pages || 1) || loading} className="btn">Next</button>
        </div>
      </div>
    </div>
  );
}
