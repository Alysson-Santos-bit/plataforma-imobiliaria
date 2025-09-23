import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Importa o DTO de atualização

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = this.userRepository.create(registerUserDto);
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  // --- LÓGICA DE ATUALIZAÇÃO ADICIONADA AQUI ---
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // O preload carrega o usuário existente e mescla com os novos dados.
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    // Salva o usuário atualizado no banco de dados.
    return this.userRepository.save(user);
  }
}

