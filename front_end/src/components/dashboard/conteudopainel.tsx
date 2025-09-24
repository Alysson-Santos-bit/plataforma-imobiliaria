"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Stats } from '../types';
import { Home, Users, Building, BarChart2 } from 'lucide-react';

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

export const ConteudoPainel = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                setStats(response.data);
            } catch (err) {
                console.error("Erro ao buscar estatísticas:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CartaoEstatistica titulo="Receita Mensal" valor="R$ 45.890" icone={<Home className="text-indigo-600" />} />
            <CartaoEstatistica titulo="Novos Aluguéis" valor="12" icone={<Users className="text-indigo-600" />} />
            <CartaoEstatistica 
                titulo="Imóveis Ativos" 
                valor={stats ? stats.totalProperties.toString() : '...'} 
                icone={<Building className="text-indigo-600" />} 
            />
            <CartaoEstatistica 
                titulo="Usuários Cadastrados" 
                valor={stats ? stats.totalUsers.toString() : '...'} 
                icone={<Users className="text-indigo-600" />} 
            />
            <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Visão Geral de Vendas</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Componente de Gráfico</p>
                </div>
            </div>
        </div>
    );
};

