import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Схема данных для Drizzle ORM
// Синтакиси базы данных sqlite
// Таблица с указанным именем и структурой
export const User = sqliteTable('user', {
  id: int('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  refreshToken: text('refreshToken').notNull(),
});
