import { IsString, IsNotEmpty, IsNumber, IsEnum, IsPositive, MaxLength, IsArray, IsUrl, IsOptional } from 'class-validator';
import { PropertyType } from '../entities/property.entity';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  area: number;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  type: PropertyType;
  
  // --- CAMPO NOVO ADICIONADO AQUI ---
  @IsArray()
  @IsUrl({}, { each: true }) // Garante que cada item do array é uma URL válida
  @IsOptional() // O campo é opcional, o usuário não é obrigado a enviar imagens
  imageUrls?: string[];
}

