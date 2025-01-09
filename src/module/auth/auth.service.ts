import dayjs from 'dayjs';
import { jwtConstants } from 'src/common/constants/jwtConstants';
import { AuthResponse } from 'src/common/types/auth-response';
import { UserProfile } from 'src/common/types/user-profile-response';
import { hashPassword } from 'src/common/utils/hash-password';
import { CODE_HAS_EXPIRED, CODE_IS_VALID } from 'src/content/errors/code.error';
import { UsersService } from 'src/module/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  EMAIL_ALREADY_EXIST,
  PHONE_ALREADY_EXIST,
  USER_NOT_FOUND,
} from './../../content/errors/user.error';
import { SignUpDto } from './../users/dtos/signup-user-schema';
import { VerifyAccountDto } from './dtos/verify-schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { email, phone, firstName, lastName, password } = signUpDto;
    const hash_password = await hashPassword(password);
    const data = {
      email,
      phone,
      firstName,
      lastName,
      codeId: uuidv4(),
      codeExpiredAt: dayjs().add(1, 'days').toDate(),
      password: hash_password,
    };
    const existing_email = await this.usersService.findOneByEmail(email);
    const existing_phone = await this.usersService.findOneByPhone(phone);
    if (existing_email) {
      throw new ConflictException(EMAIL_ALREADY_EXIST);
    } else if (existing_phone) {
      throw new ConflictException(PHONE_ALREADY_EXIST);
    }
    const user = await this.usersService.create(data);
    const payload = { sub: user.id, username: user.lastName };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }
  async signIn(user: UserProfile): Promise<AuthResponse> {
    const payload = { sub: user.id, username: user.lastName };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }
  async verifyAccount(verifyAccountDto: VerifyAccountDto): Promise<any> {
    const user = await this.usersService.findById(verifyAccountDto.id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    if (verifyAccountDto.code_id !== user.codeId) {
      throw new BadRequestException(CODE_IS_VALID);
    }
    const isBeforeCheck = dayjs().isBefore(user.codeExpiredAt);

    if (!isBeforeCheck) {
      throw new BadRequestException(CODE_HAS_EXPIRED);
    }
    return await this.usersService.updateUser(verifyAccountDto.id, {
      isActive: true,
    });
  }
  async retryActive(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const data = {
      codeId: uuidv4(),
      codeExpiredAt: dayjs().add(1, 'days').toDate(),
    };
    return await this.usersService.updateUser(user.id, data);
  }
}
