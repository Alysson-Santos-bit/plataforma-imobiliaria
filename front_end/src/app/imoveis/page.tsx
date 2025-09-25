// Local: src/app/imoveis/page.tsx

"use client";

import { GerenciadorImoveis } from '@/components/dashboard/gestorimoveis';

export default function PaginaPublicaDeImoveis() {
  return (
    <div>
      {/* Renderizamos o mesmo gerenciador, mas forçamos a visão pública.
        Isso vai esconder o botão "Adicionar Imóvel" e os botões de ação nos detalhes.
      */}
      <GerenciadorImoveis termoPesquisa="" isAdminView={false} />
    </div>
  );
}