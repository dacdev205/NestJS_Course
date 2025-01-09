import { Strategy } from 'passport-local';
import { UserProfile } from 'src/common/types/user-profile-response';
import { UsersService } from 'src/module/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserProfile> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user as UserProfile;
  }
}
