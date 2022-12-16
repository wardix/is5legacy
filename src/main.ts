import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressListRoutes from 'express-list-routes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT'));
  app.enableCors();
  await app.listen(port || 3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes(router));
}
bootstrap();
