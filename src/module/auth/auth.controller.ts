import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dtos/signup-user-schema';
import { AuthResponse } from 'src/common/types/auth-response';
import { LocalAuthGuard } from 'src/module/auth/guards/local-auth.guard';
import { UserProfile } from 'src/common/types/user-profile-response';
import { CurrentUser } from 'src/common/decorators/req-user-decorators';
import { VerifyAccountDto } from './dtos/verify-schema';
import { ChangePasswordDto } from './dtos/change-password';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResetPassDto } from './dtos/reset-password';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserProfile): Promise<AuthResponse> {
    return await this.authService.signIn(user);
  }
  @Post('register')
  async register(@Body() signUpDto: SignUpDto): Promise<AuthResponse> {
    return await this.authService.signUp(signUpDto);
  }
  @Post('verify-account')
  async verifyAccount(
    @Body() verifyAccountDto: VerifyAccountDto,
  ): Promise<any> {
    return await this.authService.verifyAccount(verifyAccountDto);
  }

  @Post('retry-active')
  async retryActiveAccount(@Body('email') email: string): Promise<any> {
    return await this.authService.retryActive(email);
  }
  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    return await this.authService.changePassword(changePasswordDto);
  }
  @Post('retry-password')
  async retryResetPassword(@Body('email') email: string): Promise<any> {
    return await this.authService.retryResetPassword(email);
  }
  @Put('reset-password')
  async resetPassword(@Body() ressetPassDto: ResetPassDto): Promise<User> {
    return await this.authService.resetPassword(ressetPassDto);
  }
}
