import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GlobalModule } from 'src/shared/global.module';
import { Module } from '@nestjs/common';
import { UserRepository } from 'src/module/users/user.repo';
import { UsersModule } from 'src/module/users/users.module';
import { UsersService } from 'src/module/users/users.service';

@Module({
  imports: [UsersModule, GlobalModule],
  providers: [AuthService, UsersService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
