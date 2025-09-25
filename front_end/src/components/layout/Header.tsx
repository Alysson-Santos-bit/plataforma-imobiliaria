// Local: src/components/layout/Header.tsx

"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; // Importamos o hook de autenticação

export default function Header() {
  // Pegamos o estado de autenticação e a função de logout do nosso contexto
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          ImobPlat
        </Link>

        {/* Links de Navegação */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">Início</Link>
          <Link href="/imoveis" className="text-gray-600 hover:text-indigo-600">Imóveis</Link>
          {/* ... outros links públicos ... */}

          {/* Lógica de Autenticação */}
          {isLoading ? (
            // Enquanto verifica o login, podemos mostrar um placeholder ou nada
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
          ) : isAuthenticated ? (
            // Se o usuário ESTÁ logado
            <>
              <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Acessar Painel
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-600 hover:text-indigo-600"
              >
                Sair
              </button>
            </>
          ) : (
            // Se o usuário NÃO ESTÁ logado
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Fazer Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}