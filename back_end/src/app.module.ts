import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Seus Módulos
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { DocumentsModule } from './documents/documents.module';
import { ReferralsModule } from './referrals/referrals.module';
import { DashboardModule } from './dashboard/dashboard.module';

// --- PASSO 1: IMPORTE SUAS ENTIDADES AQUI ---
import { User } from './users/entities/user.entity';
import { Property } from './properties/entities/property.entity';
import { Referral } from './referrals/referrals.entity';
import { Document } from './documents/document.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        
        // --- PASSO 2: LISTE AS ENTIDADES IMPORTADAS AQUI ---
        entities: [User, Property, Referral, Document],
        
        // Garante que as tabelas serão criadas
        synchronize: true, 
      }),
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