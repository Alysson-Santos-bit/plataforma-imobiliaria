import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateReferralDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do indicado é obrigatório.' })
  referredName: string;

  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail do indicado é obrigatório.' })
  referredEmail: string;

  @IsString()
  @IsOptional()
  referredPhone?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
