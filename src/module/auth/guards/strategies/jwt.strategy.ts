import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserProfile } from 'src/common/types/user-profile-response';
import { UsersService } from 'src/module/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string,
    });
  }

  async validate(payload: any): Promise<UserProfile> {
    const id = payload.sub;

    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user as UserProfile;
  }
}
