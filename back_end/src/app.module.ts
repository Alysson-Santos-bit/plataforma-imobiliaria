import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { DocumentsModule } from './documents/documents.module';
import { ReferralsModule } from './referrals/referrals.module';
import { User } from './users/entities/user.entity';
import { Property } from './properties/entities/property.entity';
import { Referral } from './referrals/referrals.entity';
import { Document } from './documents/document.entity'; // 1. Importa a nova entidade

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // 2. Adiciona a nova entidade à lista de construção
      entities: [User, Property, Referral, Document],
      synchronize: true,
      logging: false, // Desligando o modo detetive por enquanto
    }),
    AuthModule,
    UsersModule,
    PropertiesModule,
    DocumentsModule,
    ReferralsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

