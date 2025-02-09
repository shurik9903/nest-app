import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { tokenPayload } from '../token-payload.interface';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';

// Описание стратегии доступа для JwtAuthGuard @UseGuards с помощью библиотеки "passport", "passport-jwt", '@nestjs/passport'
// Проверка по токену
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService, // Конфигурация сервера
    private readonly userService: UsersService,
  ) {
    super({
      // Получение JWT из HTTP запроса клиента по cookie и данным Authentication
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      // Получение секрета/ключа из конфигурации (NestJS и/или .env) для расшифровки JWT
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  // Валидация пользователя по JWT token payload
  async validate(payload: tokenPayload) {
    return this.userService.getById(payload.userId);
  }
}
