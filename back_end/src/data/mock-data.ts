// src/data/mock-data.ts
// Este ficheiro exporta uma lista de imóveis simulados para ser usada no portfólio.
// As imagens são do Unsplash para dar um toque realista ao projeto.

export interface Imovel {
  id: string;
  titulo: string;
  tipo: 'Apartamento' | 'Casa' | 'Moradia' | 'Terreno';
  status: 'Venda' | 'Aluguer';
  preco: number;
  localizacao: {
    cidade: string;
    bairro: string;
  };
  caracteristicas: {
    quartos: number;
    casasDeBanho: number;
    garagem: number;
  };
  area: number; // em m²
  imagens: string[];
  dataPublicacao: string;
}

export const imoveisSimulados: Imovel[] = [
  {
    id: 'imovel-01',
    titulo: 'Apartamento Moderno no Centro de Lisboa',
    tipo: 'Apartamento',
    status: 'Venda',
    preco: 450000,
    localizacao: {
      cidade: 'Lisboa',
      bairro: 'Avenidas Novas',
    },
    caracteristicas: {
      quartos: 3,
      casasDeBanho: 2,
      garagem: 1,
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
    titulo: 'Moradia com Piscina no Algarve',
    tipo: 'Moradia',
    status: 'Aluguer',
    preco: 2500, // por mês
    localizacao: {
      cidade: 'Faro',
      bairro: 'Vale do Lobo',
    },
    caracteristicas: {
      quartos: 4,
      casasDeBanho: 3,
      garagem: 2,
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
    titulo: 'Casa de Campo Rústica no Gerês',
    tipo: 'Casa',
    status: 'Venda',
    preco: 280000,
    localizacao: {
      cidade: 'Braga',
      bairro: 'Parque Nacional Peneda-Gerês',
    },
    caracteristicas: {
      quartos: 2,
      casasDeBanho: 1,
      garagem: 0,
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
    titulo: 'Estúdio Aconchegante no Porto',
    tipo: 'Apartamento',
    status: 'Aluguer',
    preco: 850, // por mês
    localizacao: {
      cidade: 'Porto',
      bairro: 'Bonfim',
    },
    caracteristicas: {
      quartos: 1,
      casasDeBanho: 1,
      garagem: 0,
    },
    area: 45,
    imagens: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603934333636-1a05a6a69413?q=80&w=1974&auto=format&fit=crop',
    ],
    dataPublicacao: '2025-09-05',
  },
];
