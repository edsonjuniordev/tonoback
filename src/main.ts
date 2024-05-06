import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/framework/nestjs/app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './package/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: env.origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(env.port);
}
bootstrap();
