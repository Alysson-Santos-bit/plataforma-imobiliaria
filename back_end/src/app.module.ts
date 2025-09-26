import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe o ConfigService
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { DocumentsModule } from './documents/documents.module';
import { ReferralsModule } from './referrals/referrals.module';
import { DashboardModule } from './dashboard/dashboard.module';

// Suas entidades
import { User } from './users/entities/user.entity';
import { Property } from './properties/entities/property.entity';
import { Referral } from './referrals/referrals.entity';
import { Document } from './documents/document.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule global
    }),
    
    // Configuração do TypeORM modificada para ser assíncrona e inteligente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        return {
          type: 'postgres',
          
          // No Render, ele usará a DATABASE_URL. Localmente, usará as variáveis separadas.
          url: configService.get<string>('DATABASE_URL'),
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          
          // Configuração de SSL necessária para se conectar a bancos em nuvem como o do Render
          // Ativamos apenas em produção para não atrapalhar o ambiente local
          ssl: isProduction ? { rejectUnauthorized: false } : false,

          entities: [User, Property, Referral, Document],
          
          // Em produção, é melhor usar migrations (synchronize: false)
          synchronize: !isProduction, 
        };
      },
    }),

    AuthModule,
    UsersModule,
    PropertiesModule,
    DocumentsModule,
    ReferralsModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}