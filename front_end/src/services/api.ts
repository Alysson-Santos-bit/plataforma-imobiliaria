import axios from 'axios';

// 1. Lê a variável de ambiente para a URL do back-end.
//    Se não for encontrada, usa 'http://localhost:3001' como um fallback de segurança.
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// 2. Cria uma instância do Axios (a ferramenta para fazer chamadas de rede)
//    com a baseURL configurada corretamente.
export const api = axios.create({
  baseURL: apiBaseUrl,
});

// 3. (Opcional, mas é uma boa prática) Adiciona um "interceptor" que irá
//    automaticamente incluir o token de autenticação em todas as futuras
//    requisições à API depois de o utilizador fazer o login.
api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
