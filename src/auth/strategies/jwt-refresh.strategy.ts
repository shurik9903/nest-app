import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { tokenPayload } from '../token-payload.interface';
import { AuthService } from '../auth.service';

// Описание стратегии доступа для JwtRefreshAuthGuard @UseGuards с помощью библиотеки "passport", "passport-jwt", '@nestjs/passport'
// Проверка по jwt-refresh токену
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh', // Имя стратегии
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // Получение JWT из HTTP запроса клиента по cookie и данным Refresh
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Refresh,
      ]),
      // Получение секрета/ключа из конфигурации (NestJS и/или .env) для расшифровки JWT
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      //
      passReqToCallback: true,
    });
  }

  // Использоваться для получения текущего идентификатора контекста, а не для генерации нового
  // Валидация пользователя по Refresh токену
  async validate(request: Request, payload: tokenPayload) {
    return this.authService.verifyUserRefreshToken(
      request.cookies?.Refresh,
      payload.userId,
    );
  }
}
