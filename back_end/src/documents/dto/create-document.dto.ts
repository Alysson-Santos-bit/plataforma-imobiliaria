import { IsString, IsNotEmpty, IsArray, IsEmail } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do arquivo é obrigatório.' })
  fileName: string;

  @IsArray()
  @IsEmail({}, { each: true, message: 'Forneça uma lista de e-mails válidos.' })
  @IsNotEmpty({ message: 'Pelo menos um e-mail de signatário é obrigatório.' })
  signerEmails: string[];
}
