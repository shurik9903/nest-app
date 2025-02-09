import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

// Описание стратегии доступа для LocalAuthGuard @UseGuards с помощью библиотеки "passport", "passport-local", '@nestjs/passport'
// Проверка по логину и паролю
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return this.authService.verifyUser(email, password);
  }
}
