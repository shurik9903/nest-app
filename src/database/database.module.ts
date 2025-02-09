import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [DrizzleModule],
})
export class DatabaseModule {}
