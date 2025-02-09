import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema/schema';

export const DRIZZLE = Symbol('drizzle-connection'); // Создает уникальный идентификатор из строки
/**
 * let sym2 = Symbol("key");
 * let sym3 = Symbol("key");
 *
 * sym2 === sym3; // false, symbols are unique
 */

@Module({
  providers: [
    {
      // Создание пользовательского провайдера (Custom providers)
      // https://docs.nestjs.com/fundamentals/custom-providers
      provide: DRIZZLE, // Имя провайдера
      inject: [ConfigService], // Внедрение провайдера в данный провайдер (DRIZZLE)
      // useFactory - Фабрика данного провайдера (DRIZZLE).
      // Возвращает значение при внедрении (Inject).
      // @Inject(DRIZZLE) private readonly db: DrizzleDB === drizzle(fileName, { schema }) as LibSQLDatabase<typeof schema>

      useFactory: async (configService: ConfigService) => {
        // Получение данных (url/file) из конфигурации (NestJS и/или .env) для подключения к базе данных
        // .env - DB_FILE_NAME=file:./src/drizzle/local.db
        const fileName = configService.get<string>('DB_FILE_NAME');
        // Создание подключения к БД через ORM Drizzle с указанной схемой
        // Получает все схемы из schema/schema.ts
        return drizzle(fileName, { schema }) as LibSQLDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
