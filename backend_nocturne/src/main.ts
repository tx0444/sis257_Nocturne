import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

  // Servir archivos estáticos para subida de imágenes de productos
  // Se usa __dirname para localizar correctamente la carpeta uploads
  // tanto en local (dist/src → ../../uploads) como en Render
  const uploadsDir = join(__dirname, '..', '..', 'uploads');
  const uploadsDirFallback = join(process.cwd(), 'uploads');
  const finalUploadsDir = existsSync(uploadsDir) ? uploadsDir : uploadsDirFallback;
  if (!existsSync(finalUploadsDir)) {
    mkdirSync(finalUploadsDir, { recursive: true });
  }
  console.log(`Serving uploads from: ${finalUploadsDir}`);
  app.use('/uploads', express.static(finalUploadsDir));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Licorería Nocturne: Cold Storage API')
    .setDescription('API Rest para gestión de licorería Nocturne: Cold Storage - SIS257')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Nocturne: Cold Storage API corriendo en ${await app.getUrl()}`);
  console.log(`Swagger UI disponible en: http://localhost:3000/api`);
}
bootstrap();
