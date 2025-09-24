import { Controller, Get, Param, Delete, UseGuards, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

// Define que esta classe irá gerir os pedidos para o endereço base /users
@Controller('users')
// Protege todas as rotas neste controlador, exigindo um token de login válido
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Responde a pedidos GET para /users (buscar todos os usuários)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Responde a pedidos GET para /users/:id (buscar um usuário específico)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
  
  // Responde a pedidos PATCH para /users/:id (atualizar um usuário)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Responde a pedidos DELETE para /users/:id (apagar um usuário)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
