import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Стратегия защиты для @UseGuards описанная в local.strategy.ts
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
