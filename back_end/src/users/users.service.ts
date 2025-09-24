import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  
  // --- MÉTODO NOVO PARA BUSCAR TODOS OS USUÁRIOS ---
  async findAll(): Promise<User[]> {
    // Retorna todos os usuários do banco de dados.
    return this.userRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    return this.userRepository.save(user);
  }

  // --- MÉTODO NOVO PARA APAGAR UM USUÁRIO ---
  async remove(id: string): Promise<{ message: string }> {
    // Encontra o usuário que queremos apagar.
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    // Remove o usuário do banco de dados.
    await this.userRepository.remove(user);
    // Retorna uma mensagem de sucesso.
    return { message: `Usuário com ID "${id}" apagado com sucesso.` };
  }
}
