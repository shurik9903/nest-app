import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/drizzle/migrations', // Путь для файлов миграции
  schema: './src/drizzle/schema/**.schema.ts', // Путь к схеме
  dialect: 'sqlite', // Диалект базы данных (в данном случае sqlite)
  dbCredentials: {
    // реквезиты БД
    url: process.env.DB_FILE_NAME!, // url базы данных (в данном случае так как база локальная file:./src/drizzle/local.db)
  },
});
