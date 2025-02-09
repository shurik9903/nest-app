import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Стратегия защиты для @UseGuards описанная в jwt.strategy.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
