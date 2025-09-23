"use client"; // Diretiva para o Next.js tratar este como um Componente de Cliente.

import React, { useState, ReactNode } from 'react';

// --- Dados Simulados e Tipagem (Versão Brasil) ---

export interface Imovel {
  id: string;
  titulo: string;
  tipo: 'Apartamento' | 'Casa' | 'Terreno';
  status: 'Venda' | 'Aluguel';
  preco: number;
  descricao: string;
  localizacao: {
    cidade: string;
    bairro: string;
    endereco: string;
  };
  caracteristicas: {
    quartos: number;
    suites: number;
    banheiros: number;
    vagasGaragem: number;
  };
  area: number; // em m²
  imagens: string[];
  dataPublicacao: string;
}

export const imoveisSimulados: Imovel[] = [
  {
    id: 'imovel-01',
    titulo: 'Apartamento Moderno nos Jardins',
    tipo: 'Apartamento',
    status: 'Venda',
    preco: 950000,
    descricao: 'Apartamento totalmente reformado com acabamentos de alto padrão. Localizado no coração dos Jardins, próximo a restaurantes, lojas e parques. Ampla sala de estar com varanda gourmet.',
    localizacao: {
      cidade: 'São Paulo',
      bairro: 'Jardins',
      endereco: 'Rua Augusta, 2500'
    },
    caracteristicas: {
      quartos: 3,
      suites: 1,
      banheiros: 2,
      vagasGaragem: 1,
    },
    area: 120,
    imagens: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop',
    ],
    dataPublicacao: '2025-09-22',
  },
  {
    id: 'imovel-02',
    titulo: 'Casa com Piscina na Barra da Tijuca',
    tipo: 'Casa',
    status: 'Aluguel',
    preco: 15000, // por mês
    descricao: 'Casa espetacular em condomínio fechado de luxo. Possui área de lazer completa com piscina, churrasqueira e jardim. Segurança 24 horas e próximo à praia.',
    localizacao: {
      cidade: 'Rio de Janeiro',
      bairro: 'Barra da Tijuca',
      endereco: 'Av. das Américas, 5000'
    },
    caracteristicas: {
      quartos: 4,
      suites: 4,
      banheiros: 5,
      vagasGaragem: 2,
    },
    area: 250,
    imagens: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    ],
    dataPublicacao: '2025-09-15',
  },
  {
    id: 'imovel-03',
    titulo: 'Sítio Aconchegante em Minas Gerais',
    tipo: 'Casa',
    status: 'Venda',
    preco: 780000,
    descricao: 'Refúgio perfeito para quem busca tranquilidade e contato com a natureza. Casa principal com estilo rústico, pomar, e uma vista deslumbrante para as montanhas.',
    localizacao: {
      cidade: 'Tiradentes',
      bairro: 'Serra de São José',
      endereco: 'Estrada Real, km 10'
    },
    caracteristicas: {
      quartos: 2,
      suites: 1,
      banheiros: 2,
      vagasGaragem: 4,
    },
    area: 95,
    imagens: [
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558969548-f81aa9e06182?q=80&w=2070&auto=format&fit=crop',
    ],
    dataPublicacao: '2025-09-10',
  },
   {
    id: 'imovel-04',
    titulo: 'Studio Aconchegante no Batel',
    tipo: 'Apartamento',
    status: 'Aluguel',
    preco: 2200, // por mês
    descricao: 'Studio moderno e funcional, totalmente mobiliado. Ideal para estudantes ou jovens profissionais. Prédio com academia, lavanderia e portaria 24h.',
    localizacao: {
      cidade: 'Curitiba',
      bairro: 'Batel',
      endereco: 'Av. do Batel, 1800'
    },
    caracteristicas: {
      quartos: 1,
      suites: 0,
      banheiros: 1,
      vagasGaragem: 0,
    },
    area: 45,
    imagens: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603934333636-1a05a6a69413?q=80&w=1974&auto=format&fit=crop',
    ],
    dataPublicacao: '2025-09-05',
  },
];


// --- Tipos e Interfaces ---
type PageId = 'painel' | 'analises' | 'imoveis' | 'usuarios' | 'configuracoes';

interface IconProps {
  className?: string;
}
// --- Ícones ... (o código dos ícones permanece o mesmo)
const HomeIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>);
const ChartIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>);
const BuildingIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M12 18V6"></path><path d="M18 18V6"></path><path d="M6 18V6"></path><path d="M12 12H6"></path><path d="M18 12h-6"></path></svg>);
const UsersIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const SettingsIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>);
const MenuIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>);
const BedIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16h20V4Z"/><path d="M2 10h20"/><path d="M6 18v-6"/></svg>);
const BathIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0L3 5"/><path d="m2 2 20 20"/><path d="M3.5 8.5 6 11"/><path d="M5 13H2v6a2 2 0 0 0 2 2h2"/><path d="M21 13h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3.88"/><path d="M16 13.01V10a2 2 0 0 1 2-2h1"/></svg>);
const CarIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><path d="M7 17h10"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>);
const AreaIcon: React.FC<IconProps> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3H3v18h18V3Z"/><path d="M12 3v18"/><path d="m15 12-4-4"/><path d="m15 12-4 4"/></svg>);


interface SidebarItemProps { icon: React.ElementType<IconProps>; text: string; active?: boolean; onClick: () => void; }
interface CardProps { children: ReactNode; }
interface StatCardProps { title: string; value: string; change: string; }

// --- Componentes da Interface (Sidebar, Card, etc. O código permanece o mesmo) ---
const Card: React.FC<CardProps> = ({ children }) => (<div className="bg-white rounded-lg shadow p-6">{children}</div>);
const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => (<Card><h3 className="text-sm font-medium text-gray-500">{title}</h3><div className="mt-2 flex items-baseline"><p className="text-2xl font-semibold text-gray-900">{value}</p></div><p className="text-xs text-green-500 mt-1">{change}</p></Card>);
const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, active, onClick }) => (<li><a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`flex items-center p-3 rounded-lg text-gray-900 transition-colors ${ active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}><Icon className="w-6 h-6" /><span className="ml-4 font-medium">{text}</span></a></li>);
interface SidebarProps { currentPage: PageId; setCurrentPage: (page: PageId) => void; isSidebarOpen: boolean;}
const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen }) => {
  const handleNavigation = (page: PageId) => { setCurrentPage(page); };
  return (
    <aside className={`bg-white w-64 min-h-screen p-4 border-r border-gray-200 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}>
      <div className="text-2xl font-bold text-blue-600 mb-8">PortfólioImob</div>
      <ul className="space-y-2">
        <SidebarItem icon={HomeIcon} text="Painel" active={currentPage === 'painel'} onClick={() => handleNavigation('painel')} />
        <SidebarItem icon={ChartIcon} text="Análises" active={currentPage === 'analises'} onClick={() => handleNavigation('analises')} />
        <SidebarItem icon={BuildingIcon} text="Imóveis" active={currentPage === 'imoveis'} onClick={() => handleNavigation('imoveis')} />
        <SidebarItem icon={UsersIcon} text="Usuários" active={currentPage === 'usuarios'} onClick={() => handleNavigation('usuarios')} />
        <SidebarItem icon={SettingsIcon} text="Configurações" active={currentPage === 'configuracoes'} onClick={() => handleNavigation('configuracoes')} />
      </ul>
    </aside>
  );
};


// --- Componentes de Conteúdo das Páginas ---

const PaginaPainel = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel Principal</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Receita Total" value="R$ 750.800" change="+12% vs. mês anterior" />
      <StatCard title="Novos Aluguéis" value="34" change="+5% vs. mês anterior" />
      <StatCard title="Imóveis à Venda" value="89" change="-2% vs. mês anterior" />
      <StatCard title="Visitantes" value="12,345" change="+20% vs. mês anterior" />
    </div>
    <div className="mt-8"><Card><h2 className="text-lg font-semibold">Gráfico de Vendas (Simulação)</h2><div className="bg-gray-200 h-64 mt-4 rounded-lg flex items-center justify-center"><p className="text-gray-500">Espaço para o gráfico</p></div></Card></div>
  </div>
);

const PaginaGenerica = ({ titulo }: { titulo: string }) => (
    <div><h1 className="text-3xl font-bold text-gray-800 mb-6">{titulo}</h1><Card><div className="h-96 flex items-center justify-center"><p className="text-gray-500">Conteúdo para {titulo} virá aqui.</p></div></Card></div>
);

// Página de Lista de Imóveis
const PaginaImoveis = ({ onImovelSelect }: { onImovelSelect: (id: string) => void }) => {
  const formatadorPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Imóveis</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {imoveisSimulados.map((imovel) => (
          <div key={imovel.id} onClick={() => onImovelSelect(imovel.id)} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
            <img src={imovel.imagens[0]} alt={`[Foto de ${imovel.titulo}]`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{imovel.titulo}</h3>
              <p className="text-sm text-gray-500 mt-1">{imovel.localizacao.bairro}, {imovel.localizacao.cidade}</p>
              <div className="mt-4"><span className={`text-xs font-bold py-1 px-2 rounded-full ${imovel.status === 'Venda' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{imovel.status}</span></div>
              <p className="text-xl font-bold text-blue-600 mt-3">{formatadorPreco.format(imovel.preco)}{imovel.status === 'Aluguel' && <span className="text-sm font-normal text-gray-500">/mês</span>}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NOVO: Página de Detalhes do Imóvel ---
const PaginaDetalheImovel = ({ imovel, onBack }: { imovel: Imovel; onBack: () => void }) => {
  const [imagemPrincipal, setImagemPrincipal] = useState(imovel.imagens[0]);
  const formatadorPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div>
        <button onClick={onBack} className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            &larr; Voltar para a lista
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Coluna da Galeria de Imagens */}
            <div className="lg:col-span-3">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                    <img src={imagemPrincipal} alt={`[Foto principal de ${imovel.titulo}]`} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-5 gap-2 mt-4">
                    {imovel.imagens.map((img, index) => (
                        <div key={index} onClick={() => setImagemPrincipal(img)} className={`rounded-md overflow-hidden cursor-pointer border-2 ${imagemPrincipal === img ? 'border-blue-500' : 'border-transparent'}`}>
                            <img src={img} alt={`[Thumbnail ${index + 1}]`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Coluna de Detalhes */}
            <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <span className={`text-xs font-bold py-1 px-2 rounded-full ${imovel.status === 'Venda' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{imovel.status}</span>
                    <h1 className="text-3xl font-bold text-gray-900 mt-2">{imovel.titulo}</h1>
                    <p className="text-md text-gray-600 mt-1">{imovel.localizacao.endereco}, {imovel.localizacao.bairro}, {imovel.localizacao.cidade}</p>
                    <p className="text-3xl font-bold text-blue-600 my-4">{formatadorPreco.format(imovel.preco)}{imovel.status === 'Aluguel' && <span className="text-lg font-normal text-gray-500">/mês</span>}</p>
                    
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800">Detalhes</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center"><BedIcon className="w-5 h-5 mr-2 text-blue-500"/> {imovel.caracteristicas.quartos} Quartos ({imovel.caracteristicas.suites} suítes)</div>
                            <div className="flex items-center"><BathIcon className="w-5 h-5 mr-2 text-blue-500"/> {imovel.caracteristicas.banheiros} Banheiros</div>
                            <div className="flex items-center"><CarIcon className="w-5 h-5 mr-2 text-blue-500"/> {imovel.caracteristicas.vagasGaragem} Vagas</div>
                            <div className="flex items-center"><AreaIcon className="w-5 h-5 mr-2 text-blue-500"/> {imovel.area} m²</div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-gray-800">Descrição</h3>
                        <p className="text-sm text-gray-600 mt-2">{imovel.descricao}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};


// --- Componente Principal ---
export default function PainelDeControle() {
  const [currentPage, setCurrentPage] = useState<PageId>('painel');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImovelId, setSelectedImovelId] = useState<string | null>(null);

  // Função para renderizar o conteúdo principal
  const renderContent = () => {
    // Se um imóvel foi selecionado, mostra a página de detalhes
    if (selectedImovelId) {
      const imovel = imoveisSimulados.find(i => i.id === selectedImovelId);
      if (imovel) {
        return <PaginaDetalheImovel imovel={imovel} onBack={() => setSelectedImovelId(null)} />;
      }
    }

    // Caso contrário, mostra a página selecionada no menu
    switch (currentPage) {
      case 'painel':
        return <PaginaPainel />;
      case 'imoveis':
        return <PaginaImoveis onImovelSelect={setSelectedImovelId} />;
      case 'analises':
        return <PaginaGenerica titulo="Análises" />;
      case 'usuarios':
        return <PaginaGenerica titulo="Gestão de Usuários" />;
      case 'configuracoes':
        return <PaginaGenerica titulo="Configurações" />;
      default:
        return <PaginaPainel />;
    }
  };

  // Função para lidar com a navegação da sidebar
  const handleNavigation = (page: PageId) => {
    setSelectedImovelId(null); // Limpa a seleção de imóvel ao navegar pelo menu
    setCurrentPage(page);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar currentPage={currentPage} setCurrentPage={handleNavigation} isSidebarOpen={isSidebarOpen} />
      <main className="flex-1 p-6 md:p-10">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 mb-4 bg-gray-200 rounded-md">
            <MenuIcon className="h-6 w-6 text-gray-800" />
        </button>
        {renderContent()}
      </main>
    </div>
  );
}

