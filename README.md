Plataforma Imobiliária Personalizada
Este é o código-fonte do projeto de plataforma imobiliária personalizada, construído com um backend robusto em NestJS e um frontend moderno em Next.js.

Estrutura de Pastas
O projeto está dividido em duas pastas principais:

/backend: Contém toda a API e a lógica de negócio do servidor.

/frontend: Contém toda a interface do usuário que será exibida no navegador.

Tecnologias Utilizadas
Backend:

Framework: NestJS (Node.js)

Linguagem: TypeScript

Banco de Dados: PostgreSQL (via TypeORM)

Autenticação: JWT (JSON Web Tokens) com Passport.js

Validação: class-validator, class-transformer

Frontend:

Framework: Next.js (React)

Linguagem: TypeScript

Estilização: Tailwind CSS

Comunicação com API: Axios

Como Iniciar o Projeto
Você precisará ter o Node.js (versão LTS) instalado.

1. Configurando o Backend
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie uma cópia do arquivo de variáveis de ambiente
# Preencha o .env com os dados do seu banco de dados e uma chave JWT_SECRET
cp .env.example .env

# Inicie o servidor em modo de desenvolvimento
npm run start:dev

O backend estará rodando em http://localhost:3001.

2. Configurando o Frontend
# Em um novo terminal, navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie uma cópia do arquivo de variáveis de ambiente
cp .env.local.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev

O frontend estará rodando em http://localhost:3000.

Próximos Passos
Implementar a lógica específica nos arquivos de service do backend.

Construir as interfaces de usuário nos arquivos de página (.tsx) do frontend.

Integrar com a API de assinatura de documentos no documents.service.ts.