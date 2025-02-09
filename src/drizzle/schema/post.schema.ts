import { int, sqliteTable } from 'drizzle-orm/sqlite-core';

// Схема данных для Drizzle ORM
// Синтакиси базы данных sqlite
// Таблица с указанным именем и структурой
export const Post = sqliteTable('post', {
  id: int().primaryKey({ autoIncrement: true }),
  num: int().notNull(),
});
