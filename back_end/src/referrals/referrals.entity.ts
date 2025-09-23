import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';

// Define os possíveis status de uma indicação
export enum ReferralStatus {
  PENDING = 'PENDING',       // Acabou de ser criada
  CONTACTED = 'CONTACTED',   // Já entraram em contato com a pessoa
  CLOSED_DEAL = 'CLOSED_DEAL', // Negócio fechado!
  REJECTED = 'REJECTED',     // Indicação não resultou em negócio
}

@Entity({ name: 'referrals' })
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // --- Informações de quem indicou ---
  @Column()
  referrerId: string; // Guarda o ID do usuário que fez a indicação

  // Cria uma relação com a tabela de usuários
  @ManyToOne(() => User)
  referrer: User;

  // --- Informações de quem foi indicado ---
  @Column()
  referredName: string;

  @Column()
  referredEmail: string;

  @Column({ nullable: true }) // Telefone é opcional
  referredPhone: string;

  // --- Status e Data ---
  @Column({
    type: 'enum',
    enum: ReferralStatus,
    default: ReferralStatus.PENDING, // Toda nova indicação começa como pendente
  })
  status: ReferralStatus;
  
  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { nullable: true }) // Campo para anotações internas
  notes: string;
}
