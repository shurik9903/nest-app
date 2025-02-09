import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../drizzle/schema/post.schema';
import { DRIZZLE } from '../drizzle/drizzle.module';

import { DrizzleDB } from '../drizzle/types/drizzle';
import { CreateDto } from '../dto/create.dto';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async insert(post: CreateDto) {
    return (await this.db.insert(Post).values(post).returning())[0];
  }
}
