import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/drizzle/schema/user.schema';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // Защита по логину и паролю
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser()
    user: typeof User.$inferSelect,
    // @Res (Response) - получение Response. passthrough - пропустить запрос.
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  @Post('refresh')
  // Обновить JWT-Refresh токен
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @CurrentUser()
    user: typeof User.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }
}
