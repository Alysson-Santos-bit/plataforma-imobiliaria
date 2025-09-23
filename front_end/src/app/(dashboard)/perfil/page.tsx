'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../services/api';

// Molde para os dados que vamos buscar e enviar
interface ProfileData {
  name: string;
  phone: string;
  documentNumber: string;
  email: string; // O email não será editável
}

export default function PerfilPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    phone: '',
    documentNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Busca os dados do perfil atual quando a página carrega
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        const profile = response.data;
        setFormData({
          name: profile.name || '',
          phone: profile.phone || '',
          documentNumber: profile.documentNumber || '',
          email: profile.email, // Email vem do backend e não muda
        });
      } catch (err) {
        setError('Não foi possível carregar seu perfil.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    // Apenas os campos editáveis são enviados
    const dataToUpdate = {
      name: formData.name,
      phone: formData.phone,
      documentNumber: formData.documentNumber,
    };

    try {
      await api.patch('/users/profile', dataToUpdate);
      setSuccess('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar o perfil.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return <p className="text-center mt-12 text-gray-500">Carregando seu perfil...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Editar Perfil
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-2xl mx-auto">
        {/* Email (não editável) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" name="email" id="email" value={formData.email} disabled className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" />
          <p className="text-xs text-gray-500 mt-1">O e-mail não pode ser alterado.</p>
        </div>
        
        {/* Nome Completo */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="(XX) XXXXX-XXXX" />
        </div>

        {/* CPF/CNPJ */}
        <div>
          <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
          <input type="text" name="documentNumber" id="documentNumber" value={formData.documentNumber} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Mensagens de erro e sucesso */}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div className="flex justify-between items-center pt-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            &larr; Voltar para o Dashboard
          </Link>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

