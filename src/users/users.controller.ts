import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from 'src/dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/drizzle/schema/user.schema';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    await this.userService.create(request);
  }

  @Get()
  // @UseGuards - Декоратор, который связывает guards с объемом контроллера или метода, в зависимости от его контекста.
  // JwtAuthGuard - стратегия проверки
  // Защита по токену
  // Получение доступа только для авторизованных по JWT
  @UseGuards(JwtAuthGuard)
  async getUser(
    // @CurrentUser() - пользовательский декоратор для получения данных пользователя из контекста запроса
    @CurrentUser() user: typeof User.$inferSelect,
  ) {
    return this.userService.getById(user.id);
  }
}
