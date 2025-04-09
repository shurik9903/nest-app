import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { User } from 'src/drizzle/schema/user.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreateUserRequest } from 'src/dto/create-user.request';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(data: CreateUserRequest) {
    await this.db
      .insert(User)
      .values({
        ...data,
        password: await hash(data.password, 10),
        refreshToken: '',
      })
      .execute();
  }

  async getByEmail(
    email: string,
  ): Promise<typeof User.$inferSelect | undefined> {
    const user = await this.db.query.User.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    }).execute();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getById(id: number): Promise<typeof User.$inferSelect | undefined> {
    const user = await this.db.query.User.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    }).execute();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateRefreshTokenById(
    id: number,
    token: string,
  ): Promise<typeof User.$inferInsert | undefined> {
    const user = await this.db
      .update(User)
      .set({
        refreshToken: token,
      })
      .where(eq(User.id, id))
      .returning();

    if (!user[0]) {
      throw new NotFoundException('User not found');
    }

    return user[0];
  }
}
