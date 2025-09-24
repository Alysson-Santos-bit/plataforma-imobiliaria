// Importa e configura o dotenv como a PRIMEIRA linha de todo o projeto.
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS robusta
  const frontendUrl = process.env.FRONTEND_URL;
  console.log(`A aceitar pedidos do front-end em: ${frontendUrl}`);
  
  app.enableCors({
    origin: frontendUrl, // Permite apenas pedidos vindos deste URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend a rodar na porta ${port}`);
}
bootstrap();

