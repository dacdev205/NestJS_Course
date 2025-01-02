import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = {
      username,
      pass,
    };
    console.log(payload);

    // const { password, ...result } = user;
    // // TODO: Generate a JWT and return it here
    // // instead of the user object
    // console.log(password);

    // return result;
  }
}
