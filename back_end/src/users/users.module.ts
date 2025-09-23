import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller'; // 1. Importa o novo controller

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController], // 2. Adiciona o controller à lista
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

