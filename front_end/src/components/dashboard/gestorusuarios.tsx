"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import type { User, UserFormData } from '../types';
import { PlusCircle, ArrowLeft, Pencil, Trash2 } from 'lucide-react';

// --- Sub-componentes Visuais ---

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

// --- Componente de Gestão Principal ---
export const GerenciadorUsuarios = ({ termoPesquisa }: { termoPesquisa: string }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [userSelecionado, setUserSelecionado] = useState<User | null>(null);
    const [modo, setModo] = useState<'lista' | 'adicionar' | 'editar'>('lista');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => { fetchUsers(); }, []);
    
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
            setModo('lista');
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

    const usuariosFiltrados = users.filter(user =>
        user.name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        user.email.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">A carregar usuários...</div>;
    if (error && modo === 'lista') return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

    switch(modo) {
        case 'adicionar':
            return <FormularioUsuario onSalvar={handleSalvarUsuario} onCancelar={() => setModo('lista')} tituloForm="Adicionar Novo Usuário" />;
        case 'editar':
            return userSelecionado ? <FormularioUsuario userInicial={userSelecionado} onSalvar={handleSalvarUsuario} onCancelar={() => setModo('lista')} tituloForm="Editar Usuário" /> : null;
        default:
            return <ListaUsuarios users={usuariosFiltrados} onEditar={(user) => { setUserSelecionado(user); setModo('editar'); }} onDeletar={handleDeletarUsuario} onAdicionarClick={() => setModo('adicionar')} />;
    }
}

