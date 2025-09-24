"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Imovel } from '../types';
import { PlusCircle, ArrowLeft, Pencil, Trash2 } from 'lucide-react';

// --- Sub-componentes Visuais ---

const ListaImoveis = ({ imoveis, onVerDetalhes, onAdicionarClick }: { imoveis: Imovel[], onVerDetalhes: (imovel: Imovel) => void, onAdicionarClick: () => void }) => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Listagem de Imóveis</h2>
            <button
                onClick={onAdicionarClick}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
                <PlusCircle size={20} className="mr-2" />
                Adicionar Imóvel
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {imoveis.map(imovel => {
                const imageUrl = imovel.imageUrls && imovel.imageUrls.length > 0
                    ? imovel.imageUrls[0]
                    : `https://placehold.co/400x300/e2e8f0/64748b?text=Sem+Foto`;

                return (
                    <div key={imovel.id} onClick={() => onVerDetalhes(imovel)} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 group">
                        <img src={imageUrl} alt={imovel.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-indigo-600">{imovel.title}</h3>
                            <p className="text-gray-600">{imovel.city}, {imovel.state}</p>
                            <p className="text-xl font-bold text-indigo-700 mt-2">
                                {imovel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

const DetalhesImovel = ({ imovel, onVoltar, onEditar, onDeletar }: { imovel: Imovel, onVoltar: () => void, onEditar: (imovel: Imovel) => void, onDeletar: (id: string) => void }) => {
    const fotoPrincipal = imovel.imageUrls && imovel.imageUrls.length > 0
      ? imovel.imageUrls[0]
      : `https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Foto`;
    const fotosSecundarias = imovel.imageUrls?.slice(1) || [];

    const handleDeletarClick = () => {
        if (window.confirm("Tem a certeza que deseja apagar este imóvel? Esta ação é irreversível.")) {
            onDeletar(imovel.id);
        }
    }

    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <button onClick={onVoltar} className="flex items-center text-indigo-600 hover:text-indigo-800">
                <ArrowLeft size={20} className="mr-2" />
                Voltar para a lista
            </button>
            <div className="flex space-x-2">
                <button onClick={() => onEditar(imovel)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                    <Pencil size={20} className="mr-2" />
                    Editar
                </button>
                <button onClick={handleDeletarClick} className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors">
                    <Trash2 size={20} className="mr-2" />
                    Deletar
                </button>
            </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src={fotoPrincipal} alt={imovel.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
              {fotosSecundarias.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {fotosSecundarias.map((foto, index) => (
                    <img key={index} src={foto} alt={`${imovel.title} - foto ${index + 2}`} className="w-full h-24 object-cover rounded-md cursor-pointer" />
                  ))}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{imovel.title}</h2>
              <p className="text-lg text-gray-600 mt-2">{imovel.city}, {imovel.state}</p>
              <p className="text-4xl font-bold text-indigo-700 my-4">
                {imovel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <div className="flex space-x-6 border-t border-b py-4 my-4">
                <div className="text-center">
                  <p className="font-bold text-xl">{imovel.bedrooms}</p>
                  <p className="text-sm text-gray-500">Quartos</p>
                </div>
                 <div className="text-center">
                  <p className="font-bold text-xl">{imovel.bathrooms}</p>
                  <p className="text-sm text-gray-500">Banheiros</p>
                </div>
                 <div className="text-center">
                  <p className="font-bold text-xl">{imovel.area} m²</p>
                  <p className="text-sm text-gray-500">Área</p>
                </div>
              </div>
              <h3 className="font-semibold text-xl mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{imovel.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

const estadoInicialImovel: Omit<Imovel, 'id'> = {
  title: '', description: '', address: '', city: '', state: '', zipCode: '',
  price: 0, area: 0, bedrooms: 0, bathrooms: 0, type: 'HOUSE', imageUrls: [],
};

const FormularioImovel = ({ imovelInicial, onSalvar, onCancelar, tituloForm }: { imovelInicial?: Imovel, onSalvar: (imovel: Omit<Imovel, 'id'>, id?: string) => void, onCancelar: () => void, tituloForm: string }) => {
  const [imovel, setImovel] = useState(imovelInicial || estadoInicialImovel);
  useEffect(() => {
    setImovel(imovelInicial || estadoInicialImovel);
  }, [imovelInicial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['price', 'area', 'bedrooms', 'bathrooms'].includes(name)) {
        setImovel(prev => ({ ...prev, [name]: Number(value) || 0 }));
    } else if (name === 'imageUrls') {
      setImovel(prev => ({ ...prev, imageUrls: value.split(',').map(url => url.trim()).filter(url => url) }));
    } else {
        setImovel(prev => ({ ...prev, [name]: value as any }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); onSalvar(imovel, imovelInicial?.id);
  };

  return (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{tituloForm}</h2>
            <button onClick={onCancelar} className="flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft size={20} className="mr-2" />
                Cancelar
            </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
            {/* ... (código completo do formulário de imóvel aqui) ... */}
        </form>
    </div>
  );
}

// --- Componente de Gestão Principal ---

export const GerenciadorImoveis = ({ termoPesquisa }: { termoPesquisa: string }) => {
    const [imoveis, setImoveis] = useState<Imovel[]>([]);
    const [imovelSelecionado, setImovelSelecionado] = useState<Imovel | null>(null);
    const [modo, setModo] = useState<'lista' | 'detalhes' | 'adicionar' | 'editar'>('lista');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImoveis = async () => {
        setLoading(true); setError(null);
        try {
            const response = await api.get('/properties');
            setImoveis(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar imóveis');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => { fetchImoveis(); }, []);

    const handleSalvarImovel = async (imovelData: Omit<Imovel, 'id'>, id?: string) => {
        // ... (código inalterado) ...
    };
    const handleDeletarImovel = async (id: string) => {
        // ... (código inalterado) ...
    };

    const imoveisFiltrados = imoveis.filter(imovel =>
        imovel.title.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        imovel.city.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">A carregar imóveis...</div>;
    if (error && modo === 'lista') return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

    switch (modo) {
        case 'detalhes':
            return imovelSelecionado ? <DetalhesImovel imovel={imovelSelecionado} onVoltar={() => setModo('lista')} onEditar={(imovel) => { setImovelSelecionado(imovel); setModo('editar'); }} onDeletar={handleDeletarImovel}/> : null;
        case 'adicionar':
            return <FormularioImovel onSalvar={handleSalvarImovel} onCancelar={() => setModo('lista')} tituloForm="Adicionar Novo Imóvel"/>;
        case 'editar':
            return imovelSelecionado ? <FormularioImovel imovelInicial={imovelSelecionado} onSalvar={handleSalvarImovel} onCancelar={() => setModo('lista')} tituloForm="Editar Imóvel"/> : null;
        default:
            return <ListaImoveis imoveis={imoveisFiltrados} onVerDetalhes={(imovel) => { setImovelSelecionado(imovel); setModo('detalhes'); }} onAdicionarClick={() => setModo('adicionar')} />;
    }
}

