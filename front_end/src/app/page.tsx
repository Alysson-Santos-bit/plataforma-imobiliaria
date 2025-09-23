import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Encontre o Imóvel dos Seus Sonhos
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A nossa plataforma inovadora conecta proprietários, clientes e corretores de forma eficiente e automatizada.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
          Ver Imóveis
        </button>
        <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md border border-blue-600 hover:bg-gray-100 transition-colors duration-300">
          Anuncie o Seu
        </button>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Destaques</h2>
        {/* Aqui será a secção de imóveis em destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Exemplo de card de imóvel */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
               <span className="text-gray-500">Imagem do Imóvel</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Apartamento Moderno</h3>
              <p className="text-gray-600 mb-4">Centro da Cidade</p>
              <p className="text-2xl font-semibold text-blue-600">R$ 500.000</p>
            </div>
          </div>
           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
               <span className="text-gray-500">Imagem do Imóvel</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Casa com Quintal</h3>
              <p className="text-gray-600 mb-4">Bairro Residencial</p>
              <p className="text-2xl font-semibold text-blue-600">R$ 850.000</p>
            </div>
          </div>
           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
               <span className="text-gray-500">Imagem do Imóvel</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Cobertura Duplex</h3>
              <p className="text-gray-600 mb-4">Vista Panorâmica</p>
              <p className="text-2xl font-semibold text-blue-600">R$ 1.200.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
