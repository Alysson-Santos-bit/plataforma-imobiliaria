import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Define os possíveis status de um documento
export enum DocumentStatus {
  DRAFT = 'DRAFT',         // Rascunho, ainda não enviado
  PENDING = 'PENDING',       // Enviado, aguardando assinatura
  SIGNED = 'SIGNED',         // Assinado por todas as partes
  CANCELED = 'CANCELED',     // Processo cancelado
}

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string; // Nome do arquivo original, ex: "contrato_aluguel.pdf"

  // Chave única fornecida pelo serviço de assinatura (ex: Clicksign)
  // É com essa chave que vamos consultar o status do documento lá no serviço deles.
  @Column({ unique: true })
  signatureServiceKey: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.DRAFT,
  })
  status: DocumentStatus;

  // Guarda os e-mails dos signatários
  @Column('text', { array: true })
  signerEmails: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
