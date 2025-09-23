'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../../../services/api';

export default function EditarImovelPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'APARTMENT',
  });
  // Estado separado para gerenciar as imagens
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchImovel = async () => {
        try {
          const response = await api.get(`/properties/${id}`);
          const imovel = response.data;
          setFormData({
            title: imovel.title,
            description: imovel.description,
            address: imovel.address,
            city: imovel.city,
            state: imovel.state,
            zipCode: imovel.zipCode,
            price: String(imovel.price),
            bedrooms: String(imovel.bedrooms),
            bathrooms: String(imovel.bathrooms),
            area: String(imovel.area),
            type: imovel.type,
          });
          // Preenche o estado das imagens
          setImageUrls(imovel.imageUrls && imovel.imageUrls.length > 0 ? imovel.imageUrls : ['']);
        } catch (err) {
          setError('Não foi possível carregar os dados do imóvel.');
        } finally {
          setLoading(false);
        }
      };
      fetchImovel();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls.length > 0 ? newImageUrls : ['']); // Garante que sempre haja pelo menos um campo
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms, 10),
      bathrooms: parseInt(formData.bathrooms, 10),
      area: parseFloat(formData.area),
      imageUrls: imageUrls.filter(url => url.trim() !== ''),
    };

    try {
      await api.patch(`/properties/${id}`, propertyData);
      alert('Imóvel atualizado com sucesso!');
      router.push('/imoveis');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar o imóvel.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return <p className="text-center mt-12 text-gray-500">Carregando dados do imóvel...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Editar Imóvel
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* ... (campos de título, descrição, etc.) ... */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Anúncio</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
        </div>

        {/* --- SEÇÃO DE IMAGENS ADICIONADA AQUI --- */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Imagens do Imóvel</h2>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeImageUrlField(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageUrlField}
            className="mt-4 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
          >
            + Adicionar Imagem
          </button>
        </div>

        {/* ... (resto do formulário e botões) ... */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
             <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
                <input type="text" name="zipCode" id="zipCode" value={formData.zipCode} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                <input type="number" name="price" id="price" step="0.01" value={formData.price} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Imóvel</label>
                <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="APARTMENT">Apartamento</option>
                    <option value="HOUSE">Casa</option>
                    <option value="LAND">Terreno</option>
                    <option value="COMMERCIAL">Comercial</option>
                </select>
            </div>
            <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área (m²)</label>
                <input type="number" name="area" id="area" step="0.01" value={formData.area} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Quartos</label>
                <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Banheiros</label>
                <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/imoveis" className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancelar
          </Link>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

