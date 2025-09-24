"use client";

import React from 'react';

export const Cabecalho = ({ titulo, termoPesquisa, onPesquisaChange }: { titulo: string,toggleSidebar: () => void, termoPesquisa: string, onPesquisaChange: (valor: string) => void }) => (
    <header className="bg-white p-4 flex items-center justify-between w-full">
    <h1 className="text-2xl font-bold text-gray-800">{titulo}</h1>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="w-64 pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={termoPesquisa}
            onChange={(e) => onPesquisaChange(e.target.value)}
        />
        <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="Avatar do usuário" />
    </div>
  </header>
);
