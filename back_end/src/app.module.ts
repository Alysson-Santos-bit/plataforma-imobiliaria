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
import { Document } from './documents/document.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // --- CORRIGIDO ---
      // Agora, estamos a usar os nomes corretos das variáveis do ficheiro .env
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // --- FIM DA CORREÇÃO ---
      entities: [User, Property, Referral, Document],
      synchronize: true, // `synchronize: true` é ótimo para desenvolvimento, mas deve ser desativado em produção.
      logging: false,
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
