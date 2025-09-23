import { Controller, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // Todas as rotas aqui começarão com /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard) // Garante que apenas usuários logados podem acessar
  @Patch('profile') // A rota será PATCH /users/profile
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    // O req.user.id vem do token JWT e garante que o usuário só pode editar o próprio perfil
    const userId = req.user.id;
    return this.usersService.update(userId, updateUserDto);
  }
}
