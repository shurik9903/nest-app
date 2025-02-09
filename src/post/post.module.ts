import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  providers: [PostService],
  exports: [
    // То, что экспортирует данный модуль для доступа к данным текущего модуля во внешние модули,
    //  в которые будет импортирован данный модуль.
    PostService,
  ],
  imports: [DrizzleModule],
})
export class PostModule {}
