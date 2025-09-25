// Local: src/components/dashboard/gestorimoveis.tsx

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';
import type { Imovel } from '@/components/types';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle, ArrowLeft, Pencil, Trash2 } from 'lucide-react';


// ===================================================================
// SUB-COMPONENTES INTERNOS (COMPLETOS)
// ===================================================================

const ListaImoveis = ({ imoveis, onVerDetalhes, onAdicionarClick, isAdminView }: { imoveis: Imovel[], onVerDetalhes: (imovel: Imovel) => void, onAdicionarClick: () => void, isAdminView: boolean }) => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Nossos Imóveis</h2>
            {isAdminView && (
                <button onClick={onAdicionarClick} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <PlusCircle size={20} className="mr-2" />
                    Adicionar Imóvel
                </button>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {imoveis.map(imovel => {
                const imageUrl = imovel.imageUrls?.[0] || `https://placehold.co/400x300/e2e8f0/64748b?text=Sem+Foto`;
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

const DetalhesImovel = ({ imovel, onVoltar, onEditar, onDeletar, isAdminView }: { imovel: Imovel, onVoltar: () => void, onEditar: (imovel: Imovel) => void, onDeletar: (id: string) => void, isAdminView: boolean }) => {
    const fotoPrincipal = imovel.imageUrls?.[0] || `https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Foto`;
    const fotosSecundarias = imovel.imageUrls?.slice(1) || [];

    const handleDeletarClick = () => {
        if (window.confirm("Tem a certeza que deseja apagar este imóvel? Esta ação é irreversível.")) {
            onDeletar(imovel.id);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onVoltar} className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <ArrowLeft size={20} className="mr-2" /> Voltar para a lista
                </button>
                {isAdminView && (
                    <div className="flex space-x-2">
                        <button onClick={() => onEditar(imovel)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                            <Pencil size={20} className="mr-2" /> Editar
                        </button>
                        <button onClick={handleDeletarClick} className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors">
                            <Trash2 size={20} className="mr-2" /> Deletar
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img src={fotoPrincipal} alt={imovel.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                        {fotosSecundarias.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {fotosSecundarias.map((foto: string, index: number) => (
                                    <img key={index} src={foto} alt={`${imovel.title} - foto ${index + 2}`} className="w-full h-24 object-cover rounded-md" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{imovel.title}</h2>
                        <p className="text-lg text-gray-600 mt-2">{imovel.address}</p>
                        <p className="text-lg text-gray-600">{imovel.city}, {imovel.state}</p>
                        <p className="text-4xl font-bold text-indigo-700 my-4">
                            {imovel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <div className="flex space-x-6 border-t border-b py-4 my-4">
                            <div className="text-center"><p className="font-bold text-xl">{imovel.bedrooms}</p><p className="text-sm text-gray-500">Quartos</p></div>
                            <div className="text-center"><p className="font-bold text-xl">{imovel.bathrooms}</p><p className="text-sm text-gray-500">Banheiros</p></div>
                            <div className="text-center"><p className="font-bold text-xl">{imovel.area} m²</p><p className="text-sm text-gray-500">Área</p></div>
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Descrição</h3>
                        <p className="text-gray-700 leading-relaxed">{imovel.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// CÓDIGO COMPLETO DO FORMULÁRIO RESTAURADO AQUI
const FormularioImovel = ({ imovelInicial, onSalvar, onCancelar, tituloForm }: { imovelInicial?: Imovel, onSalvar: (imovel: Omit<Imovel, 'id'>, id?: string) => void, onCancelar: () => void, tituloForm: string }) => {
    const estadoInicialImovel: Omit<Imovel, 'id'> = {
        title: '', description: '', address: '', city: '', state: '', zipCode: '',
        price: 0, area: 0, bedrooms: 0, bathrooms: 0, type: 'HOUSE', imageUrls: [],
    };
    const [imovel, setImovel] = useState(imovelInicial || estadoInicialImovel);

    useEffect(() => {
        setImovel(imovelInicial || estadoInicialImovel);
    }, [imovelInicial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (['price', 'area', 'bedrooms', 'bathrooms'].includes(name)) {
            setImovel(prev => ({ ...prev, [name]: Number(value) || 0 }));
        } else if (name === 'imageUrls') {
            setImovel(prev => ({ ...prev, imageUrls: value.split(',').map(url => url.trim()).filter(Boolean) }));
        } else {
            setImovel(prev => ({ ...prev, [name]: value as any }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSalvar(imovel, imovelInicial?.id);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{tituloForm}</h2>
                <button onClick={onCancelar} className="flex items-center text-gray-600 hover:text-gray-800">
                    <ArrowLeft size={20} className="mr-2" /> Cancelar
                </button>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                        <input type="text" name="title" id="title" value={imovel.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea name="description" id="description" value={imovel.description} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
                        <input type="text" name="address" id="address" value={imovel.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input type="text" name="city" id="city" value={imovel.city} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                        <input type="text" name="state" id="state" value={imovel.state} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
                        <input type="text" name="zipCode" id="zipCode" value={imovel.zipCode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                        <input type="number" name="price" id="price" value={imovel.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área (m²)</label>
                        <input type="number" name="area" id="area" value={imovel.area} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Quartos</label>
                        <input type="number" name="bedrooms" id="bedrooms" value={imovel.bedrooms} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Banheiros</label>
                        <input type="number" name="bathrooms" id="bathrooms" value={imovel.bathrooms} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Imóvel</label>
                        <select name="type" id="type" value={imovel.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
                            <option value="HOUSE">Casa</option>
                            <option value="APARTMENT">Apartamento</option>
                            <option value="LAND">Terreno</option>
                            <option value="COMMERCIAL">Comercial</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">URLs das Imagens (separadas por vírgula)</label>
                        <input type="text" name="imageUrls" id="imageUrls" value={imovel.imageUrls.join(', ')} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <button type="button" onClick={onCancelar} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg mr-4 hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700">Salvar Imóvel</button>
                </div>
            </form>
        </div>
    );
};


// ===================================================================
// COMPONENTE PRINCIPAL (EXPORTADO)
// ===================================================================

export const GerenciadorImoveis = ({ termoPesquisa, isAdminView = false }: { termoPesquisa: string, isAdminView?: boolean }) => {
    const { isAuthenticated } = useAuth();
    const [imoveis, setImoveis] = useState<Imovel[]>([]);
    const [imovelSelecionado, setImovelSelecionado] = useState<Imovel | null>(null);
    const [modo, setModo] = useState<'lista' | 'detalhes' | 'adicionar' | 'editar'>('lista');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const modoAdminReal = isAdminView && isAuthenticated;

    const fetchImoveis = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const response = await api.get('/properties');
            setImoveis(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar imóveis');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImoveis();
    }, [fetchImoveis]);
    
    const handleSalvarImovel = async (imovelData: Omit<Imovel, 'id'>, id?: string) => {
        if (!modoAdminReal) return;
        try {
            if (id) {
                await api.patch(`/properties/${id}`, imovelData);
            } else {
                await api.post('/properties', imovelData);
            }
            await fetchImoveis();
            setModo('lista');
        } catch (err) {
            console.error("Erro ao salvar imóvel", err);
            setError("Não foi possível salvar o imóvel.");
        }
    };
    
    const handleDeletarImovel = async (id: string) => {
        if (!modoAdminReal) return;
        try {
            await api.delete(`/properties/${id}`);
            await fetchImoveis();
            setModo('lista');
        } catch (err) {
            console.error("Erro ao deletar imóvel", err);
            setError("Não foi possível deletar o imóvel.");
        }
    };
    
    const imoveisFiltrados = imoveis.filter(imovel =>
        imovel.title.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        imovel.city.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">A carregar imóveis...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

    switch (modo) {
        case 'detalhes':
            return imovelSelecionado ? <DetalhesImovel imovel={imovelSelecionado} onVoltar={() => setModo('lista')} onEditar={(imovel) => { setImovelSelecionado(imovel); setModo('editar'); }} onDeletar={handleDeletarImovel} isAdminView={modoAdminReal} /> : null;
        case 'adicionar':
            return <FormularioImovel onSalvar={handleSalvarImovel} onCancelar={() => setModo('lista')} tituloForm="Adicionar Novo Imóvel"/>;
        case 'editar':
            return imovelSelecionado ? <FormularioImovel imovelInicial={imovelSelecionado} onSalvar={handleSalvarImovel} onCancelar={() => setModo('lista')} tituloForm="Editar Imóvel"/> : null;
        default:
            return <ListaImoveis imoveis={imoveisFiltrados} onVerDetalhes={(imovel) => { setImovelSelecionado(imovel); setModo('detalhes'); }} onAdicionarClick={() => setModo('adicionar')} isAdminView={modoAdminReal} />;
    }
}