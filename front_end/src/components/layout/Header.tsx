// --- Componente do Cabeçalho ---
// Este é um componente de cabeçalho padrão para uma aplicação web.
// Ele inclui navegação e é estilizado com Tailwind CSS.
// A dependência do Next.js foi removida para garantir a compatibilidade.

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logotipo ou Nome do Site */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-400 transition-colors">
            PlataformaImob
          </a>
        </div>

        {/* Links de Navegação para Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-blue-400 transition-colors">
            Início
          </a>
          <a href="/imoveis" className="hover:text-blue-400 transition-colors">
            Imóveis
          </a>
          <a href="/sobre" className="hover:text-blue-400 transition-colors">
            Sobre Nós
          </a>
          <a href="/contato" className="hover:text-blue-400 transition-colors">
            Contato
          </a>
          {/* Link para o Painel que criamos */}
          <a href="/painel" className="hover:text-blue-400 transition-colors">
            Painel
          </a>
        </nav>

        {/* Botão de Ação */}
        <div className="hidden md:flex">
           <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Entrar
          </a>
        </div>

        {/* Botão de Menu para Mobile (funcionalidade a ser adicionada com useState) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}

