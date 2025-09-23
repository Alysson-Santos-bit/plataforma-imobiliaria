import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional() // O campo é opcional
  name?: string;

  @IsString()
  @IsOptional()
  @Length(10, 20) // Exemplo de validação de tamanho
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(11, 14) // Permite CPF ou CNPJ
  documentNumber?: string;
}
