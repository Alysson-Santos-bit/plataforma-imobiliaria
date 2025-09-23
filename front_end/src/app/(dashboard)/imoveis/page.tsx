'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../services/api';

// Atualizando a interface para incluir as imagens
interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  imageUrls?: string[]; // A lista de imagens agora é esperada aqui
}

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'Preço indisponível';
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export default function MeusImoveisPage() {
  const [imoveis, setImoveis] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await api.get('/properties');
        if (Array.isArray(response.data)) {
          setImoveis(response.data);
        } else {
          setImoveis([]);
        }
      } catch (err) {
        setError("Não foi possível carregar os imóveis.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchImoveis();
  }, []);

  const handleDelete = async (propertyId: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este imóvel?')) {
      try {
        await api.delete(`/properties/${propertyId}`);
        setImoveis(prevState => prevState.filter(imovel => imovel.id !== propertyId));
        alert('Imóvel excluído com sucesso!');
      } catch (err) {
        alert("Não foi possível excluir o imóvel.");
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-12 text-gray-500">Carregando seus imóveis...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Meus Imóveis Cadastrados
        </h1>
        <Link 
          href="/imoveis/novo"
          className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          + Cadastrar Imóvel
        </Link>
      </div>

      {imoveis.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Nenhum imóvel encontrado</h2>
          <p className="text-gray-500 mt-2">
            Você ainda não cadastrou nenhum imóvel. Clique no botão acima para começar!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveis.map((imovel) => (
            <div key={imovel.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* --- LÓGICA DE EXIBIÇÃO DA IMAGEM ATUALIZADA --- */}
              <div className="w-full h-48 bg-gray-200">
                {imovel.imageUrls && imovel.imageUrls.length > 0 ? (
                  <img 
                    src={imovel.imageUrls[0]} 
                    alt={`Imagem de ${imovel.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 truncate" title={imovel.title}>{imovel.title}</h3>
                <p className="text-gray-600 mt-1">{imovel.city}, {imovel.state}</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {formatCurrency(imovel.price)}
                </p>
                <div className="flex justify-between text-sm text-gray-500 mt-4 border-t pt-2">
                    <span>{imovel.bedrooms} {imovel.bedrooms > 1 ? 'quartos' : 'quarto'}</span>
                    <span>{imovel.bathrooms} {imovel.bathrooms > 1 ? 'banheiros' : 'banheiro'}</span>
                    <span>{imovel.area} m²</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2">
                <Link
                  href={`/imoveis/editar/${imovel.id}`}
                  className="text-xs bg-yellow-500 text-white font-semibold py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(imovel.id)}
                  className="text-xs bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
       <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          &larr; Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
}

