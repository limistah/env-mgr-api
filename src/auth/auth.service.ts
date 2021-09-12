import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const passwordMatched = bcrypt.compare(pass, user.password);
      if (!passwordMatched) {
        return null;
      }
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async longLiveLogin(user: any) {
    user = await this.usersService.findOne(user.id);
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '4d' }),
      user,
    };
  }
}
