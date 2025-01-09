import { StrategyConsts } from 'src/common/constants/strategyConstants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyConsts.JWT) {}
