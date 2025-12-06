import api from './api';

export const adminApi = {
  listUsers: async (page = 1, limit = 20, search = '') => {
    const res = await api.get('/admin/users', { params: { page, limit, search } });
    return res.data;
  },

  createUser: async (payload: any) => {
    const res = await api.post('/admin/users', payload);
    return res.data;
  },

  changeRole: async (id: string, role: string) => {
    const res = await api.put(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  setStatus: async (id: string, isActive: boolean) => {
    const res = await api.put(`/admin/users/${id}/status`, { isActive });
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  }
};

export default adminApi;
