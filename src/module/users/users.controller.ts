import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.schema';
import { SignUpDto, SignUpSchema } from './dtos/signup-user-schema';
import { ROLES, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfile } from 'src/common/types/user-profile-response';
import { CurrentUser } from 'src/common/decorators/req-user-decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
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
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: UserProfile): UserProfile {
    return user;
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.delete_user(id);
    return user;
  }
  @Get()
  @UseGuards(new RolesGuard([Role.ADMIN]))
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users as User[];
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    if (updateData.roles) {
      updateData.roles = ROLES.ADMIN;
    }
    return await this.usersService.updateUser(id, updateData);
  }
}
