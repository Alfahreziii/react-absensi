// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // atau cara lain ambil token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
