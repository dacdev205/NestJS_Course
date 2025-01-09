import { jwtConstants } from 'src/common/constants/jwtConstants';
import { LocalStrategy } from 'src/module/auth/guards/strategies/local.strategy';
import { UsersModule } from 'src/module/users/users.module';
import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: jwtConstants.ACCESS_TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
