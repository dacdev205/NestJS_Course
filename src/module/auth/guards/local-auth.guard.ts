import { StrategyConsts } from 'src/common/constants/strategyConstants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(StrategyConsts.LOCAL) {}
