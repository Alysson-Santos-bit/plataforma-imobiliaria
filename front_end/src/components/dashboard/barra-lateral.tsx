"use client";

import React from 'react';
import { Home, BarChart2, Users, Settings, Building } from 'lucide-react';
import type { PaginaId } from '../types';

const ItemMenu = ({ icone, texto, ativo, onClick }: { icone: React.ReactNode, texto: string, ativo: boolean, onClick: () => void }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${ativo ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'}`}
  >
    {icone}
    <span className="ml-4 font-medium">{texto}</span>
  </li>
);

export const BarraLateral = ({ paginaAtual, setPagina, estaAberta }: { paginaAtual: PaginaId, setPagina: (pagina: PaginaId) => void, estaAberta: boolean }) => {
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
