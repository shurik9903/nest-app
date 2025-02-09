import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Стратегия защиты для @UseGuards описанная в jwt-refresh.strategy.ts
@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
