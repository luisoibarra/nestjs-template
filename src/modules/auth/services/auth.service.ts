import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { AppJwtService } from './app-jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: AppJwtService,
  ) {}

  async login(email: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (user?.passwordHash !== pass) {
      throw new UnauthorizedException();
    }
    const refreshToken = await this.jwtService.getRefreshToken({}); // TODO
    const sessionToken = await this.jwtService.getSessionToken({}); // TODO
    return {
      refreshToken: refreshToken,
      refreshTokenExpires: undefined, // TODO
      sessionToken: sessionToken,
      sessionTokenExpires: undefined, // TODO
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user?.passwordHash !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
