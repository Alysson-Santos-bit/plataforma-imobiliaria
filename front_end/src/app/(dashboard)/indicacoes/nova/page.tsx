'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../../services/api';

export default function NovaIndicacaoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    referredName: '',
    referredEmail: '',
    referredPhone: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Envia os dados para o backend
      await api.post('/referrals', formData);
      
      alert('Indicação enviada com sucesso!');
      
      // Redireciona de volta para a lista de indicações
      router.push('/indicacoes');

    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar indicação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Fazer Nova Indicação
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-2xl mx-auto">
        <p className="text-sm text-gray-600">
          Indique um cliente ou um imóvel e seja remunerado por isso! Preencha os dados abaixo para que nossa equipe possa entrar em contato.
        </p>
        
        {/* Nome do Indicado */}
        <div>
          <label htmlFor="referredName" className="block text-sm font-medium text-gray-700">Nome do Indicado</label>
          <input type="text" name="referredName" id="referredName" value={formData.referredName} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        
        {/* Email do Indicado */}
        <div>
          <label htmlFor="referredEmail" className="block text-sm font-medium text-gray-700">E-mail do Indicado</label>
          <input type="email" name="referredEmail" id="referredEmail" value={formData.referredEmail} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Telefone do Indicado */}
        <div>
          <label htmlFor="referredPhone" className="block text-sm font-medium text-gray-700">Telefone do Indicado (Opcional)</label>
          <input type="tel" name="referredPhone" id="referredPhone" value={formData.referredPhone} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="(XX) XXXXX-XXXX" />
        </div>

        {/* Anotações */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Anotações (Opcional)</label>
          <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: Informações sobre o imóvel, melhor horário para contato, etc."></textarea>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/indicacoes" className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancelar
          </Link>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-400">
            {isSubmitting ? 'Enviando...' : 'Enviar Indicação'}
          </button>
        </div>
      </form>
    </div>
  );
}

