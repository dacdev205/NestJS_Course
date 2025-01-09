import { UserProfile } from 'src/common/types/user-profile-response';
import { compare_password } from 'src/common/utils/compare-password';
import { WRONG_PASSWORD } from 'src/content/errors/password.error';
import {
  AUTH_FAILED_LOGIN,
  EMAIL_ALREADY_EXIST,
  PHONE_ALREADY_EXIST,
  USER_NOT_FOUND,
} from 'src/content/errors/user.error';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpDto } from './dtos/signup-user-schema';
import { UserRepository } from './user.repo';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const {
      email,
      phone,
      firstName,
      lastName,
      password,
      codeId,
      codeExpiredAt,
    } = signUpDto;
    const data = {
      email,
      phone,
      firstName,
      lastName,
      password,
      codeId,
      codeExpiredAt,
    };
    const existing_email = await this.findOneByEmail(email);
    const existing_phone = await this.findOneByPhone(phone);
    if (existing_email) {
      throw new ConflictException(EMAIL_ALREADY_EXIST);
    } else if (existing_phone) {
      throw new ConflictException(PHONE_ALREADY_EXIST);
    }

    return await this.userRepository.create({ data });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findOneByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phone } });
  }
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById({ where: { id } });
  }
  async validateUser(email: string, password: string): Promise<UserProfile> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const isMatching = await compare_password(password, user.password);

    if (!isMatching) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    } else if (user.isActive === false) {
      throw new ForbiddenException(AUTH_FAILED_LOGIN);
    }
    return user;
  }

  async delete_user(id: string): Promise<User | null> {
    const user = await this.userRepository.delete({ where: { id } });
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    return user;
  }
  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById({ where: { id } });
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    await this.userRepository.update({
      where: { id },
      data: updateData,
    });
    return user;
  }
}
