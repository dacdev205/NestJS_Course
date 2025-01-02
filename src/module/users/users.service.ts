import { compare_password } from 'src/common/utils/compare-password';
import { hashPassword } from 'src/common/utils/hash-password';
import { WRONG_PASSWORD } from 'src/content/errors/password.error';
import {
  EMAIL_ALREADY_EXIST,
  PHONE_ALREADY_EXIST,
  USER_NOT_FOUND,
} from 'src/content/errors/user.error';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { SignInDto } from './dtos/signin-user.schema';
import { SignUpDto } from './dtos/signup-user-schema';
import { UserRepository } from './user.repo';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signupDto: SignUpDto): Promise<User> {
    const { email, phone, firstName, lastName, password } = signupDto;
    const hash_password = hashPassword(password);
    const data = {
      email,
      phone,
      firstName,
      lastName,
      password: hash_password,
    };
    const existing_email = await this.userRepository.findOne({
      where: { email },
    });
    const existing_phone = await this.userRepository.findOne({
      where: { phone },
    });
    if (existing_email) {
      throw new ConflictException(EMAIL_ALREADY_EXIST);
    } else if (existing_phone) {
      throw new ConflictException(PHONE_ALREADY_EXIST);
    }
    const user = await this.userRepository.create({ data });
    return user;
  }
  async login(signinDto: SignInDto): Promise<User> {
    const { email, password } = signinDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const isMatching = compare_password(password, user.password);
    if (!isMatching) {
      throw new UnauthorizedException(WRONG_PASSWORD);
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
}
