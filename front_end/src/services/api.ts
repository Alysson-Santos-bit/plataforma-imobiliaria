import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Interceptor: é executado ANTES de cada pedido
api.interceptors.request.use(
  (config) => {
    // Verifica se estamos no ambiente do navegador (e não no servidor)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // Se o token existir, adiciona-o ao cabeçalho de autorização
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);