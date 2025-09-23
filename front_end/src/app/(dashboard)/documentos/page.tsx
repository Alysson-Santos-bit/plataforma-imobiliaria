'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../services/api';

// Molde para os dados de cada documento
interface Document {
  id: string;
  fileName: string;
  status: 'DRAFT' | 'PENDING' | 'SIGNED' | 'CANCELED';
  signerEmails: string[];
  updatedAt: string;
}

// Função para traduzir e colorir os status
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Pendente</span>;
    case 'SIGNED':
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Assinado</span>;
    case 'CANCELED':
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Cancelado</span>;
    case 'DRAFT':
      return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">Rascunho</span>;
    default:
      return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">Desconhecido</span>;
  }
};

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await api.get('/documents');
        setDocumentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        alert('Não foi possível carregar os documentos.');
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentos();
  }, []);

  if (loading) {
    return <p className="text-center mt-12 text-gray-500">Carregando documentos...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciador de Documentos</h1>
        <Link 
          href="/documentos/enviar" // Link para a futura página de envio
          className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          + Enviar Novo Documento
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {documentos.length === 0 ? (
          <p className="p-6 text-center text-gray-500">Nenhum documento encontrado.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Arquivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signatários</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atualização</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documentos.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.fileName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.signerEmails.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(doc.status)}
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

