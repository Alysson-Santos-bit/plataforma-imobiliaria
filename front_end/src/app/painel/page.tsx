"use client";

import React from 'react';

// --- Tipos ---
// Tipo para os IDs das páginas, garantindo que apenas valores válidos sejam usados.
type PageId = 'dashboard' | 'analytics' | 'users' | 'settings';

// Interface para as propriedades dos ícones SVG.
interface IconProps {
  className?: string;
}

// Interface para as propriedades dos componentes Card.
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Interface para as propriedades dos componentes de estatísticas.
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
}

// Interface para as propriedades do componente da barra lateral.
interface SidebarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isSidebarOpen: boolean;
}

// Interface para as propriedades do componente de conteúdo principal.
interface MainContentProps {
  currentPage: PageId;
}

// --- Ícones SVG ---
// Usando a interface IconProps para tipar a prop 'className'.
const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const BarChartIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line>
  </svg>
);

const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const SettingsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const MenuIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);


// --- Dados de Navegação ---
const navItems = [
    { id: 'dashboard', label: 'Painel', icon: HomeIcon },
    { id: 'analytics', label: 'Análises', icon: BarChartIcon },
    { id: 'users', label: 'Utilizadores', icon: UsersIcon },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon },
];

// --- Componentes Reutilizáveis ---
const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => (
  <Card>
    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    {change && (
        <p className={`mt-1 text-sm ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change}
        </p>
    )}
  </Card>
);

// --- Componentes de Página ---
const DashboardPage: React.FC = () => (
    <div>
        <h1 className="text-3xl font-bold text-white mb-6">Painel</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Receita Total" value="€45.231,89" change="+20.1% do último mês" />
            <StatCard title="Subscrições" value="+2350" change="+180.1% do último mês" />
            <StatCard title="Vendas" value="+12.234" change="+19% do último mês" />
            <StatCard title="Ativos Agora" value="+573" change="+201 desde a última hora" />
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-white mb-4">Visão Geral</h2>
                <div className="w-full h-80 bg-gray-700 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">O gráfico aparecerá aqui</p>
                </div>
            </Card>
            <Card>
                <h2 className="text-lg font-semibold text-white mb-4">Vendas Recentes</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <div className="ml-4 flex-grow">
                            <p className="font-medium text-white">Olivia Martin</p>
                            <p className="text-sm text-gray-400">olivia.martin@email.com</p>
                        </div>
                        <p className="font-medium text-white">+€1.999,00</p>
                    </li>
                     <li className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0"></div>
                        <div className="ml-4 flex-grow">
                            <p className="font-medium text-white">Jackson Lee</p>
                            <p className="text-sm text-gray-400">jackson.lee@email.com</p>
                        </div>
                        <p className="font-medium text-white">+€39,00</p>
                    </li>
                </ul>
            </Card>
        </div>
    </div>
);

const AnalyticsPage: React.FC = () => (
    <Card>
        <h1 className="text-3xl font-bold text-white">Análises</h1>
        <p className="mt-4 text-gray-300">Análises e relatórios detalhados serão exibidos aqui.</p>
        <div className="mt-6 w-full h-96 bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-gray-400">Gráfico de Análises</p>
        </div>
    </Card>
);

const UsersPage: React.FC = () => (
    <Card>
        <h1 className="text-3xl font-bold text-white">Gestão de Utilizadores</h1>
        <p className="mt-4 text-gray-300">Uma lista de utilizadores e ferramentas de gestão estarão aqui.</p>
    </Card>
);

const SettingsPage: React.FC = () => (
    <Card>
        <h1 className="text-3xl font-bold text-white">Configurações</h1>
        <p className="mt-4 text-gray-300">Configurações da aplicação e preferências do utilizador.</p>
    </Card>
);


// --- Navegação / Barra Lateral ---
const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen }) => {
    
  const commonLinkClass = "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200";
  const activeLinkClass = "bg-gray-900 text-white";

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 border-r border-gray-700 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">Meu Painel</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id as PageId);
                }}
                className={`${commonLinkClass} ${currentPage === item.id ? activeLinkClass : ''}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

// --- Área de Conteúdo Principal ---
const MainContent: React.FC<MainContentProps> = ({ currentPage }) => {
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <main className="md:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
      {renderPage()}
    </main>
  );
};


// --- Componente Principal do Painel ---
export default function PainelDeControle() {
  // Estado para gerenciar qual página está sendo exibida, com o tipo PageId.
  const [currentPage, setCurrentPage] = React.useState<PageId>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
        <Sidebar 
            currentPage={currentPage} 
            setCurrentPage={(page: PageId) => {
                setCurrentPage(page);
                setSidebarOpen(false); // Fecha a barra lateral no telemóvel após a navegação
            }} 
            isSidebarOpen={isSidebarOpen}
        />
      
        {/* Cabeçalho para Telemóvel */}
        <header className="md:hidden sticky top-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 flex justify-between items-center z-30">
            <h1 className="text-xl font-bold text-white">Painel</h1>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white p-2 rounded-md hover:bg-gray-700">
                <MenuIcon className="w-6 h-6"/>
            </button>
        </header>

        {/* Overlay para telemóvel */}
        {isSidebarOpen && (
            <div 
                onClick={() => setSidebarOpen(false)} 
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
            ></div>
        )}

        <MainContent currentPage={currentPage} />
    </div>
  );
}

