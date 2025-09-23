import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto'; // Importa o DTO de atualização

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property) {
      throw new NotFoundException(`Imóvel com ID "${id}" não encontrado.`);
    }
    return property;
  }

  // --- LÓGICA DE ATUALIZAÇÃO ADICIONADA AQUI ---
  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    // O preload carrega a entidade existente e mescla com os novos dados.
    const property = await this.propertyRepository.preload({
      id: id,
      ...updatePropertyDto,
    });
    if (!property) {
      throw new NotFoundException(`Imóvel com ID "${id}" não encontrado para atualização.`);
    }
    // Salva a entidade atualizada no banco de dados.
    return this.propertyRepository.save(property);
  }

  async remove(id: string) {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
    return { message: `Imóvel com ID "${id}" deletado com sucesso.` };
  }
}

