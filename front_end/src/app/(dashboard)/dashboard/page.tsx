"use client";

import React, { useState, useEffect } from 'react';
import { Home, BarChart2, Users, Settings, Building, ChevronLeft, PlusCircle, ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { api } from '../../../services/api';

// --- Tipos ---
type Imovel = {
  id: string; 
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  type: 'APARTMENT' | 'HOUSE' | 'LAND' | 'COMMERCIAL';
  imageUrls: string[];
};

type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'owner' | 'client' | 'partner';
};

type PaginaId = 'painel' | 'analises' | 'imoveis' | 'usuarios' | 'configuracoes';

// --- Componentes da UI (Cabeçalho, ItemMenu, BarraLateral, CartaoEstatistica) permanecem os mesmos ---

const Cabecalho = ({ titulo }: { titulo: string }) => (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between w-full">
    <h1 className="text-2xl font-bold text-gray-800">{titulo}</h1>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input type="text" placeholder="Pesquisar..." className="w-64 pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="Avatar do usuário" />
    </div>
  </header>
);

const ItemMenu = ({ icone, texto, ativo, onClick }: { icone: React.ReactNode, texto: string, ativo: boolean, onClick: () => void }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${ativo ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'}`}
  >
    {icone}
    <span className="ml-4 font-medium">{texto}</span>
  </li>
);

const BarraLateral = ({ paginaAtual, setPagina, estaAberta }: { paginaAtual: PaginaId, setPagina: (pagina: PaginaId) => void, estaAberta: boolean }) => {
  const itensMenu = [
    { id: 'painel', icone: <Home size={22} />, texto: 'Painel' },
    { id: 'analises', icone: <BarChart2 size={22} />, texto: 'Análises' },
    { id: 'imoveis', icone: <Building size={22} />, texto: 'Imóveis' },
    { id: 'usuarios', icone: <Users size={22} />, texto: 'Usuários' },
    { id: 'configuracoes', icone: <Settings size={22} />, texto: 'Configurações' },
  ] as const;

  return (
    <aside className={`bg-white h-full transition-all duration-300 ease-in-out ${estaAberta ? 'w-64' : 'w-20'} flex flex-col shadow-xl flex-shrink-0`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <Building size={30} className="text-indigo-600" />
        {estaAberta && <h1 className="text-2xl font-bold text-gray-800 ml-2">Imóbilis</h1>}
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {itensMenu.map(item => (
            <ItemMenu
              key={item.id}
              icone={item.icone}
              texto={estaAberta ? item.texto : ''}
              ativo={paginaAtual === item.id}
              onClick={() => setPagina(item.id)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const CartaoEstatistica = ({ titulo, valor, icone }: { titulo: string, valor: string, icone: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between transition-transform hover:scale-105">
    <div>
      <p className="text-sm font-medium text-gray-500">{titulo}</p>
      <p className="text-3xl font-bold text-gray-800">{valor}</p>
    </div>
    <div className="bg-indigo-100 p-3 rounded-full">
      {icone}
    </div>
  </div>
);


// --- Páginas de Conteúdo ---

const ConteudoPainel = () => (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <CartaoEstatistica titulo="Receita Mensal" valor="R$ 45.890" icone={<Home className="text-indigo-600" />} />
    <CartaoEstatistica titulo="Novos Aluguéis" valor="12" icone={<Users className="text-indigo-600" />} />
    <CartaoEstatistica titulo="Imóveis Ativos" valor="312" icone={<Building className="text-indigo-600" />} />
    <CartaoEstatistica titulo="Taxa de Ocupação" valor="92.5%" icone={<BarChart2 className="text-indigo-600" />} />
    <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Visão Geral de Vendas</h3>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Componente de Gráfico</p>
      </div>
    </div>
  </div>
);

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
                <button
                    onClick={() => onEditar(imovel)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                    <Pencil size={20} className="mr-2" />
                    Editar
                </button>
                <button
                    onClick={handleDeletarClick}
                    className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
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
      {/* ... (código do formulário inalterado) ... */}
    </div>
  );
}

// --- NOVOS COMPONENTES PARA USUÁRIOS ---

const ListaUsuarios = ({ users, onEditar, onDeletar, onAdicionarClick }: { users: User[], onEditar: (user: User) => void, onDeletar: (id: string) => void, onAdicionarClick: () => void }) => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Listagem de Usuários</h2>
            <button onClick={onAdicionarClick} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                <PlusCircle size={20} className="mr-2" />
                Adicionar Usuário
            </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onEditar(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                <button onClick={() => onDeletar(user.id)} className="text-red-600 hover:text-red-900">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

type UserFormData = Omit<User, 'id'> & { password?: string; id?: string };

const estadoInicialUsuario: UserFormData = {
    name: '', email: '', role: 'partner', password: ''
};

const FormularioUsuario = ({ userInicial, onSalvar, onCancelar, tituloForm }: { userInicial?: User, onSalvar: (user: UserFormData, id?: string) => void, onCancelar: () => void, tituloForm: string }) => {
    const [user, setUser] = useState<UserFormData>(() => userInicial ? { ...userInicial, password: '' } : estadoInicialUsuario);
    const isEditing = !!userInicial;

    useEffect(() => {
        setUser(userInicial ? { ...userInicial, password: '' } : estadoInicialUsuario);
    }, [userInicial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSalvar(user, userInicial?.id);
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
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" name="name" id="name" value={user.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={user.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                {!isEditing && (
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input type="password" name="password" id="password" value={user.password || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                )}
                 <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Função</label>
                    <select name="role" id="role" value={user.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
                        <option value="partner">Corretor (Partner)</option>
                        <option value="admin">Administrador (Admin)</option>
                        <option value="client">Cliente (Client)</option>
                        <option value="owner">Proprietário (Owner)</option>
                    </select>
                </div>
                <div className="flex justify-end pt-4">
                    <button type="button" onClick={onCancelar} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg mr-4 hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700">Salvar Usuário</button>
                </div>
            </form>
        </div>
    );
};


const ConteudoPlaceholder = ({ titulo }: { titulo: string }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
    <div className="mt-4 bg-white p-8 rounded-xl shadow-md h-96 flex items-center justify-center">
      <p className="text-gray-500">Conteúdo da página de {titulo} em desenvolvimento.</p>
    </div>
  </div>
);

// --- Componente Principal ---
export default function DashboardPage() {
  const [paginaAtual, setPaginaAtual] = useState<PaginaId>('painel');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Estados para imóveis
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [imovelSelecionado, setImovelSelecionado] = useState<Imovel | null>(null);
  const [modoImoveis, setModoImoveis] = useState<'lista' | 'detalhes' | 'adicionar' | 'editar'>('lista');
  
  // Estados para usuários
  const [users, setUsers] = useState<User[]>([]);
  const [userSelecionado, setUserSelecionado] = useState<User | null>(null);
  const [modoUsuarios, setModoUsuarios] = useState<'lista' | 'adicionar' | 'editar'>('lista');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Lógica para Imóveis ---
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
  const handleSalvarImovel = async (imovelData: Omit<Imovel, 'id'>, id?: string) => {
    const isEditing = !!id;
    try {
        setError(null);
        if (isEditing) {
            await api.patch(`/properties/${id}`, imovelData);
        } else {
            await api.post('/properties', imovelData);
        }
        await fetchImoveis();
        setModoImoveis('lista');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao salvar imóvel');
    }
  };
  const handleDeletarImovel = async (id: string) => {
    if (window.confirm("Tem a certeza que deseja apagar este imóvel?")) {
        try {
            setError(null);
            await api.delete(`/properties/${id}`);
            await fetchImoveis();
            setModoImoveis('lista');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao apagar imóvel');
        }
    }
  };
  
  // --- Lógica para Usuários ---
  const fetchUsers = async () => {
    setLoading(true); setError(null);
    try {
        const response = await api.get('/users');
        setUsers(response.data);
    } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar usuários');
    } finally {
        setLoading(false);
    }
  };

  const handleSalvarUsuario = async (userData: UserFormData, id?: string) => {
    const isEditing = !!id;
    const payload = { ...userData };
    if (isEditing) delete payload.password;

    try {
        setError(null);
        if (isEditing) {
            await api.patch(`/users/${id}`, payload);
        } else {
            await api.post('/auth/register', payload);
        }
        await fetchUsers();
        setModoUsuarios('lista');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao salvar usuário');
    }
  };

  const handleDeletarUsuario = async (id: string) => {
    if (window.confirm("Tem a certeza que deseja apagar este usuário?")) {
        try {
            setError(null);
            await api.delete(`/users/${id}`);
            await fetchUsers();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao apagar usuário');
        }
    }
  };

  useEffect(() => {
    if (paginaAtual === 'imoveis') fetchImoveis();
    if (paginaAtual === 'usuarios') fetchUsers();
  }, [paginaAtual]);

  const titulosPagina = {
    painel: 'Painel de Controle',
    analises: 'Análises e Relatórios',
    imoveis: 'Gerenciamento de Imóveis',
    usuarios: 'Gestão de Usuários',
    configuracoes: 'Configurações',
  };
  
  // --- Funções de Navegação ---
  const handleVerDetalhesImovel = (imovel: Imovel) => { setImovelSelecionado(imovel); setModoImoveis('detalhes'); };
  const handleVoltarParaListaImoveis = () => { setImovelSelecionado(null); setModoImoveis('lista'); };
  const handleAdicionarImovelClick = () => { setImovelSelecionado(null); setModoImoveis('adicionar'); };
  const handleEditarImovelClick = (imovel: Imovel) => { setImovelSelecionado(imovel); setModoImoveis('editar'); };

  const handleEditarUsuarioClick = (user: User) => { setUserSelecionado(user); setModoUsuarios('editar'); };
  const handleAdicionarUsuarioClick = () => { setUserSelecionado(null); setModoUsuarios('adicionar'); };
  const handleVoltarParaListaUsuarios = () => { setUserSelecionado(null); setModoUsuarios('lista'); };


  const renderizarConteudo = () => {
    switch (paginaAtual) {
      case 'painel': return <ConteudoPainel />;
      case 'imoveis':
        switch (modoImoveis) {
            case 'lista': return <ListaImoveis imoveis={imoveis} onVerDetalhes={handleVerDetalhesImovel} onAdicionarClick={handleAdicionarImovelClick} />;
            case 'detalhes': return imovelSelecionado ? <DetalhesImovel imovel={imovelSelecionado} onVoltar={handleVoltarParaListaImoveis} onEditar={handleEditarImovelClick} onDeletar={handleDeletarImovel}/> : null;
            case 'adicionar': return <FormularioImovel onSalvar={handleSalvarImovel} onCancelar={handleVoltarParaListaImoveis} tituloForm="Adicionar Novo Imóvel"/>;
            case 'editar': return imovelSelecionado ? <FormularioImovel imovelInicial={imovelSelecionado} onSalvar={handleSalvarImovel} onCancelar={handleVoltarParaListaImoveis} tituloForm="Editar Imóvel"/> : null;
        }
        break;
      case 'usuarios':
        switch (modoUsuarios) {
            case 'lista': return <ListaUsuarios users={users} onEditar={handleEditarUsuarioClick} onDeletar={handleDeletarUsuario} onAdicionarClick={handleAdicionarUsuarioClick} />;
            case 'adicionar': return <FormularioUsuario onSalvar={handleSalvarUsuario} onCancelar={handleVoltarParaListaUsuarios} tituloForm="Adicionar Novo Usuário" />;
            case 'editar': return userSelecionado ? <FormularioUsuario userInicial={userSelecionado} onSalvar={handleSalvarUsuario} onCancelar={handleVoltarParaListaUsuarios} tituloForm="Editar Usuário" /> : null;
        }
        break;
      default: return <ConteudoPlaceholder titulo={titulosPagina[paginaAtual]} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <BarraLateral paginaAtual={paginaAtual} setPagina={setPaginaAtual} estaAberta={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-2 bg-white shadow-sm flex-shrink-0">
             <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} className={`transform transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
            </button>
            <Cabecalho titulo={titulosPagina[paginaAtual]} />
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {error && <div className="m-4 p-3 bg-red-100 text-red-700 rounded-md text-center">Erro: {error}</div>}
          {loading ? <div className="p-8 text-center">A carregar...</div> : renderizarConteudo()}
        </main>
      </div>
    </div>
  );
}

