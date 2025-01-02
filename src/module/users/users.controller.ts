import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { SignUpDto, SignUpSchema } from './dtos/signup-user-schema';
import { User } from '@prisma/client';
import { SignInDto } from './dtos/signin-user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  @UsePipes(new ZodValidationPipe(SignUpSchema))
  async register(
    @Body()
    createUserDto: SignUpDto,
  ): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
  @Post('auth/login')
  async login(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.usersService.login(signInDto);
    return user;
  }
  @Delete('auth/delete-user/:id')
  async delete(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.delete_user(id);
    return user;
  }
}
