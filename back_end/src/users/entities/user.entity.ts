import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Enum para definir os papéis de usuário permitidos
export enum UserRole {
  ADMIN = 'admin', // Administrador com acesso total
  OWNER = 'owner', // Proprietário de imóvel
  CLIENT = 'client', // Cliente buscando imóvel
  PARTNER = 'partner', // Parceiro que faz indicações
}

@Entity('users') // Diz ao TypeORM para criar uma tabela chamada 'users' a partir desta classe
export class User {
  @PrimaryGeneratedColumn('uuid') // Chave primária, gerada automaticamente como um UUID
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT, // O papel padrão para novos usuários
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 14, nullable: true }) // CPF/CNPJ
  documentNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @CreateDateColumn() // Coluna para registrar a data de criação (gerenciada automaticamente)
  createdAt: Date;

  @UpdateDateColumn() // Coluna para registrar a última atualização (gerenciada automaticamente)
  updatedAt: Date;
}
