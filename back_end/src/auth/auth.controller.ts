import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service'; // Caminho para o serviço
import { RegisterUserDto } from './dto/register-user.dto'; // Caminho para o DTO de registo
import { LoginUserDto } from './dto/login-user.dto'; // Caminho para o DTO de login
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Caminho para o guarda

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}