import api from '../lib/axios';

export const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/api/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

