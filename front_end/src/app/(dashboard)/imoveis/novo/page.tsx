'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Corrigido para usar o caminho relativo, garantindo a resolução do módulo
import { api } from '../../../../services/api';

export default function NovoImovelPage() {
  const router = useRouter();
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
  // --- NOVO ESTADO PARA GERENCIAR AS URLS DAS IMAGENS ---
  const [imageUrls, setImageUrls] = useState(['']); // Começa com um campo vazio
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // --- FUNÇÕES PARA MANIPULAR OS CAMPOS DE IMAGEM ---
  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']); // Adiciona um novo campo vazio
  };

  const removeImageUrlField = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
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
      // Adiciona as URLs filtrando quaisquer campos vazios
      imageUrls: imageUrls.filter(url => url.trim() !== ''),
    };

    // ... (validação continua a mesma)

    try {
      await api.post('/properties', propertyData);
      alert('Imóvel cadastrado com sucesso!');
      router.push('/imoveis');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar imóvel.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Cadastrar Novo Imóvel
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Anúncio</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        {/* Descrição */}
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
        
        {/* Grid para layout de endereço */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Endereço */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          {/* Cidade */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
            <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
            <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} maxLength={2} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          {/* CEP */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
            <input type="text" name="zipCode" id="zipCode" value={formData.zipCode} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

        {/* Grid para layout de detalhes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preço */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                <input type="number" name="price" id="price" step="0.01" value={formData.price} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ex: 550000.00"/>
            </div>

            {/* Tipo */}
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Imóvel</label>
                <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="APARTMENT">Apartamento</option>
                    <option value="HOUSE">Casa</option>
                    <option value="LAND">Terreno</option>
                    <option value="COMMERCIAL">Comercial</option>
                </select>
            </div>
            
            {/* Área */}
            <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área (m²)</label>
                <input type="number" name="area" id="area" step="0.01" value={formData.area} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ex: 75"/>
            </div>
        </div>

        {/* Grid para quartos e banheiros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quartos */}
            <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Quartos</label>
                <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ex: 2"/>
            </div>

            {/* Banheiros */}
            <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Banheiros</label>
                <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ex: 1"/>
            </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/imoveis" className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancelar
          </Link>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Salvando...' : 'Salvar Imóvel'}
          </button>
        </div>
      </form>
    </div>
  );
}

