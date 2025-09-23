"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../services/api'; // Corrigido o caminho de importação
import { MapPin, DollarSign, Home } from 'lucide-react';

// --- Tipos ---
type Imovel = {
  id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  imageUrls: string[];
};

// --- Componente do Cartão de Imóvel ---
const ImovelCard = ({ imovel }: { imovel: Imovel }) => {
  const imageUrl = imovel.imageUrls && imovel.imageUrls.length > 0
    ? imovel.imageUrls[0]
    : `https://placehold.co/400x300/e2e8f0/64748b?text=Sem+Foto`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 group border border-gray-200">
      <img src={imageUrl} alt={imovel.title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-indigo-600">{imovel.title}</h3>
        <div className="flex items-center text-gray-600 mt-2">
            <MapPin size={16} className="mr-2" />
            <span>{imovel.city}, {imovel.state}</span>
        </div>
        <div className="flex items-center text-2xl font-bold text-indigo-700 mt-4">
            <DollarSign size={20} className="mr-1" />
            <span>{imovel.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};

// --- Componente da Página Inicial ---
export default function HomePage() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await api.get('/properties');
        // Pega apenas os 3 primeiros imóveis para o destaque
        setImoveis(response.data.slice(0, 3));
      } catch (err) {
        setError("Não foi possível carregar os imóveis.");
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
            <Home size={30} className="text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800 ml-2">Plataforma Imobiliária</h1>
        </div>
        <nav className="space-x-4">
            {/* Corrigido o componente de Link */}
            <a href="/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Acessar Painel
            </a>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Imóveis em Destaque</h2>

        {loading && <p className="text-center">A carregar destaques...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {imoveis.map(imovel => (
                    <ImovelCard key={imovel.id} imovel={imovel} />
                ))}
            </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Plataforma Imobiliária. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

