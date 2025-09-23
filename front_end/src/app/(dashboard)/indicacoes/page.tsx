'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../services/api';

// Molde para os dados de cada indicação
interface Referral {
  id: string;
  referredName: string;
  referredEmail: string;
  status: 'PENDING' | 'CONTACTED' | 'CLOSED_DEAL' | 'REJECTED';
  createdAt: string;
}

// Função para traduzir e colorir os status
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Pendente</span>;
    case 'CONTACTED':
      return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">Contactado</span>;
    case 'CLOSED_DEAL':
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Negócio Fechado</span>;
    case 'REJECTED':
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Rejeitado</span>;
    default:
      return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">Desconhecido</span>;
  }
};

export default function MinhasIndicacoesPage() {
  const [indicacoes, setIndicacoes] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndicacoes = async () => {
      try {
        const response = await api.get('/referrals');
        setIndicacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar indicações:', error);
        alert('Não foi possível carregar suas indicações.');
      } finally {
        setLoading(false);
      }
    };
    fetchIndicacoes();
  }, []);

  if (loading) {
    return <p className="text-center mt-12 text-gray-500">Carregando suas indicações...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Minhas Indicações</h1>
        <Link 
          href="/indicacoes/nova" // Link para a futura página de cadastro de indicação
          className="bg-green-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          + Fazer Nova Indicação
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {indicacoes.length === 0 ? (
          <p className="p-6 text-center text-gray-500">Você ainda não fez nenhuma indicação.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Indicado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {indicacoes.map((indicacao) => (
                <tr key={indicacao.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indicacao.referredName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indicacao.referredEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(indicacao.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(indicacao.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          &larr; Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
}

