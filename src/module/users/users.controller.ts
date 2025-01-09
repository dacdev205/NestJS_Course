import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { SignUpDto, SignUpSchema } from './dtos/signup-user-schema';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfile } from 'src/common/types/user-profile-response';
import { CurrentUser } from 'src/common/decorators/req-user-decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @UsePipes(new ZodValidationPipe(SignUpSchema))
  async create(
    @Body()
    createUserDto: SignUpDto,
  ): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: UserProfile): UserProfile {
    return user;
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.delete_user(id);
    return user;
  }
}
