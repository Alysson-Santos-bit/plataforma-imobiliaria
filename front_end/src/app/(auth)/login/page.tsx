'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../../../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Envia os dados de login para o backend
      const response = await api.post('/auth/login', { email, password });

      // 2. Se o login for bem-sucedido, o backend envia um token de acesso
      const { access_token } = response.data;

      // 3. Guarda o token no localStorage do navegador para ser usado depois
      localStorage.setItem('token', access_token);

      console.log('Login bem-sucedido! Token guardado.');

      // 4. Redireciona o usuário para o dashboard
      router.push('/dashboard');

    } catch (err: any) {
      // 5. Se o backend retornar um erro (ex: senha errada), mostra a mensagem
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Ocorreu um erro ao tentar fazer o login.');
      } else {
        setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Acessar sua Conta
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Endereço de E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Mensagem de erro */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
