import dayjs from 'dayjs';
import { jwtConstants } from 'src/common/constants/jwtConstants';
import { ActivationJobData } from 'src/common/interface/activation-job-data.interface';
import { ResetPassJobData } from 'src/common/interface/reset-pass-job-data.interface';
import { AuthResponse } from 'src/common/types/auth-response';
import { UserProfile } from 'src/common/types/user-profile-response';
import { compare_password } from 'src/common/utils/compare-password';
import { hashPassword } from 'src/common/utils/hash-password';
import {
  ACCOUNT_IS_ACTIVED,
  CODE_HAS_EXPIRED,
  CODE_IS_VALID,
} from 'src/content/errors/code.error';
import { WRONG_PASSWORD } from 'src/content/errors/password.error';
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
import { AuthQueue } from './auth.queue';
import { ChangePasswordDto } from './dtos/change-password';
import { ResetPassDto } from './dtos/reset-password';
import { VerifyAccountDto } from './dtos/verify-schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authQueue: AuthQueue,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<any> {
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
    const activationJobData: ActivationJobData = {
      to: email,
      activationCode: data.codeId,
    };
    await this.authQueue.addSendActiveCodeJob(activationJobData);
    const payload = {
      sub: user.id,
      username: user.lastName,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }
  async signIn(user: UserProfile): Promise<AuthResponse> {
    const payload = {
      sub: user.id,
      username: user.lastName,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }
  async verifyAccount(verifyAccountDto: VerifyAccountDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(verifyAccountDto.email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    if (user.isActive === true) {
      throw new BadRequestException(ACCOUNT_IS_ACTIVED);
    }
    if (verifyAccountDto.code_id !== user.codeId) {
      throw new BadRequestException(CODE_IS_VALID);
    }
    const isBeforeCheck = dayjs().isBefore(user.codeExpiredAt);

    if (!isBeforeCheck) {
      throw new BadRequestException(CODE_HAS_EXPIRED);
    }
    return await this.usersService.updateUser(user.id, {
      isActive: true,
    });
  }
  async retryActive(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    if (user.isActive) {
      throw new BadRequestException(ACCOUNT_IS_ACTIVED);
    }
    const data = {
      codeId: uuidv4(),
      codeExpiredAt: dayjs().add(1, 'days').toDate(),
    };
    await this.usersService.updateUser(user.id, data);
  }
  async retryResetPassword(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const data = {
      codeId: uuidv4(),
      codeExpiredAt: dayjs().add(1, 'days').toDate(),
    };
    await this.usersService.updateUser(user.id, data);
    const resetJobdata: ResetPassJobData = {
      to: email,
      resetCode: data.codeId,
    };
    await this.authQueue.addSendResetPassCodeJob(resetJobdata);
  }
  async changePassword(changePasswordDto: ChangePasswordDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(
      changePasswordDto.email,
    );
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const isMatching = await compare_password(
      changePasswordDto.old_password,
      user.password,
    );
    if (!isMatching) {
      throw new BadRequestException(WRONG_PASSWORD);
    }
    const new_password = await hashPassword(changePasswordDto.new_password);
    const data = {
      password: new_password,
    };
    return await this.usersService.updateUser(user.id, data);
  }
  async resetPassword(resetPassDto: ResetPassDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(resetPassDto.email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    if (resetPassDto.code_id !== user.codeId) {
      throw new BadRequestException(CODE_IS_VALID);
    }
    const isBeforeCheck = dayjs().isBefore(user.codeExpiredAt);

    if (!isBeforeCheck) {
      throw new BadRequestException(CODE_HAS_EXPIRED);
    }
    const hashed_password = await hashPassword(resetPassDto.new_password);
    const data = {
      password: hashed_password,
    };
    return await this.usersService.updateUser(user.id, data);
  }
  //TODO
  // forgot password
}
