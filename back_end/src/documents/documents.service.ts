import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentStatus } from './document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  // Simula o envio de um documento para um serviço de assinatura
  async sendForSignature(createDocumentDto: CreateDocumentDto): Promise<Document> {
    console.log(`Simulando envio do arquivo "${createDocumentDto.fileName}" para assinatura...`);
    
    // 1. (Simulação) Comunicação com o serviço externo (ex: Clicksign)
    // Aqui, em um projeto real, você faria a chamada para a API do Clicksign,
    // enviando o PDF e os e-mails dos signatários.
    const signatureServiceKey = `SIGN_KEY_${Date.now()}`; // Gera uma chave de assinatura falsa
    console.log(`Serviço externo retornou a chave: ${signatureServiceKey}`);

    // 2. Salva um registro do processo no nosso banco de dados
    const newDocument = this.documentRepository.create({
      fileName: createDocumentDto.fileName,
      signerEmails: createDocumentDto.signerEmails,
      signatureServiceKey: signatureServiceKey,
      status: DocumentStatus.PENDING, // O status inicial é "Pendente"
    });

    return this.documentRepository.save(newDocument);
  }

  // Lista todos os documentos registrados no nosso sistema
  async findAll(): Promise<Document[]> {
    return this.documentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
