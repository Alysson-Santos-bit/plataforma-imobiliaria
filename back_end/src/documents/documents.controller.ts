import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Protege todas as rotas de documentos
@Controller('documents') // Todas as rotas aqui começarão com /documents
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // Rota para um usuário enviar um novo documento para assinatura
  @Post('send')
  sendForSignature(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.sendForSignature(createDocumentDto);
  }

  // Rota para listar todos os documentos enviados
  @Get()
  findAll() {
    return this.documentsService.findAll();
  }
}
