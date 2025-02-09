import type * as schema from './schema/schema';
import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm';
import type { Exact } from 'type-fest';

type TSchema = ExtractTablesWithRelations<typeof schema>;

type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>;

// Преобразование схемы в читаемые типы данных
// export type InferQueryModel<
//   TableName extends keyof TSchema,
//   QBConfig extends Exact<QueryConfig<TableName>, QBConfig> = {}, // <-- notice Exact here
// > = BuildQueryResult<TSchema, TSchema[TableName], QBConfig>;
