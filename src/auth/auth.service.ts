import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { tokenPayload } from './token-payload.interface';
import { User } from 'src/drizzle/schema/user.schema';
import { Response } from 'express';

// JwtService - Сервис для работы с JWT в NestJS с помощью библиотеки '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // Авторизация
  async login(user: typeof User.$inferSelect, response: Response) {
    // Время жизни токена
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    // Время жизни refresh токена
    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    // Полезная нагрузка токена
    const tokenPayload: tokenPayload = {
      userId: user.id,
    };

    // Создание токена с указанием полезной нагрузки, секрету/ключу токена, времени жизни токена
    const accessToken = this.jwtService.sign(tokenPayload, {
      // получение данных из конфига сервера .env
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });

    // Создание refresh токена с указанием полезной нагрузки, секрету/ключу refresh токена, времени жизни refresh токена
    const refreshToken = this.jwtService.sign(tokenPayload, {
      // получение данных из конфига сервера .env
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS')}ms`,
    });

    // Сохранение захешированного токена в базе данных таблице пользователя 'refreshToken'
    await this.usersService.updateRefreshTokenById(
      user.id,
      await hash(refreshToken, 10),
    );

    // Сохранение токена в cookie пользователя
    response.cookie('Authentication', accessToken, {
      // Только для http
      httpOnly: true,
      // (HTTPS защищенное соединение) Только в режиме production (no devolepment)
      secure: this.configService.get('NODE_ENV') === 'production',
      // Дата окончания
      expires: expiresAccessToken,
    });

    // Сохранение Refresh токена в cookie пользователя
    response.cookie('Refresh', refreshToken, {
      // Только для http
      httpOnly: true,
      // (HTTPS защищенное соединение) Только в режиме production (no devolepment)
      secure: this.configService.get('NODE_ENV') === 'production',
      // Дата окончания
      expires: expiresRefreshToken,
    });
  }

  // Локальная авторизация (local authentication) по логину и паролю
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getByEmail(email);

      // Сравнение Response пароля и хешированного пароля из базы данных
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Credential are not valid.');
    }
  }

  // Локальная авторизация (local authentication) по Refresh токену
  async verifyUserRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.usersService.getById(userId);
      // Сравнение Response refresh токену и refresh токену из базы данных
      const authenticated = await compare(refreshToken, user.refreshToken);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}
