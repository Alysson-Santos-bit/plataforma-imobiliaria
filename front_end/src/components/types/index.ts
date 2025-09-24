// Este ficheiro centraliza todos os tipos de dados da nossa aplicação.

export type Imovel = {
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

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'owner' | 'client' | 'partner';
};

export type UserFormData = Omit<User, 'id'> & { password?: string };

export type Stats = {
    totalUsers: number;
    totalProperties: number;
}

export type PaginaId = 'painel' | 'analises' | 'imoveis' | 'usuarios' | 'configuracoes';

