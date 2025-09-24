// Conteúdo para: src/app/(dashboard)/dashboard/page.tsx

"use client";

import React, { useState } from 'react';

// 1. Importe os componentes que seu amigo separou
import { BarraLateral } from '@/components/dashboard/barra-lateral';
import { Cabecalho } from '@/components/dashboard/cabecalho';
import { ConteudoPainel } from '@/components/dashboard/conteudopainel';
import { ConteudoPlaceholder } from '@/components/dashboard/conteudoplaceholder';
import { GerenciadorImoveis } from '@/components/dashboard/gestorimoveis';
import { GerenciadorUsuarios } from '@/components/dashboard/gestorusuarios';

// Importe os tipos necessários
import type { PaginaId } from '@/components/types'; // Verifique se o caminho para o seu arquivo de tipos está correto

// ===============================================
// --- COMPONENTE PRINCIPAL DA PÁGINA ---
// ===============================================
export default function DashboardPage() {
    // 2. O estado agora vive aqui, no componente "pai"
    const [pagina, setPagina] = useState<PaginaId>('painel');
    const [sidebarAberta, setSidebarAberta] = useState(true);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    // 3. Função para decidir qual conteúdo renderizar com base no estado
    const renderizarConteudo = () => {
        switch (pagina) {
            case 'painel':
                return <ConteudoPainel />;
            case 'imoveis':
                return <GerenciadorImoveis termoPesquisa={termoPesquisa} />;
            case 'usuarios':
                return <GerenciadorUsuarios termoPesquisa={termoPesquisa} />;
            case 'analises':
            case 'configuracoes':
                return <ConteudoPlaceholder titulo={pagina} />;
            default:
                return <ConteudoPainel />;
        }
    };

    // 4. O JSX final que monta a página inteira
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <BarraLateral 
                paginaAtual={pagina} 
                setPagina={setPagina} 
                estaAberta={sidebarAberta} 
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Cabecalho
                    titulo={pagina}
                    toggleSidebar={() => setSidebarAberta(!sidebarAberta)}
                    termoPesquisa={termoPesquisa}
                    onPesquisaChange={setTermoPesquisa}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {renderizarConteudo()}
                </main>
            </div>
        </div>
    );
}