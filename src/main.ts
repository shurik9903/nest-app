import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import * as cookieParser from 'cookie-parser'; NestJS v9.4.x+

// Стартовый файл сервер-приложения bootstrap

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Создания приложения NestJS по указанному стартовому модулю
  app.useGlobalPipes(new ValidationPipe()); // Регистрирует трубы как глобальные трубы (будут использоваться в каждом обработчике маршрута HTTP)
  app.use(cookieParser()); // Использование модуля cookieParser из библиотеки для чтения cookie cookie-parser
  await app.listen(process.env.PORT ?? 3000); // Прослушивание указанного порта
}
bootstrap();
