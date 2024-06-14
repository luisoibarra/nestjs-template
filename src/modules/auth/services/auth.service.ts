import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { AppJwtService } from './app-jwt.service';
import { HashService } from 'src/modules/hash/services/hash.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: AppJwtService,
    private hashService: HashService,
  ) {}

  async login(email: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (user == undefined || !user) {
      throw new UnauthorizedException();
    }
    if (!this.hashService.isMatch(pass, user.passwordHash)) {
      throw new UnauthorizedException();
    }

    const { token: refreshToken, expiresIn: refreshTokenExpires } =
      await this.jwtService.getRefreshToken(
        this.jwtService.defaultPayload(user, true),
      );
    const { token: sessionToken, expiresIn: sessionTokenExpires } =
      await this.jwtService.getSessionToken(
        this.jwtService.defaultPayload(user, false),
      );
    return {
      refreshToken: refreshToken,
      refreshTokenExpires: refreshTokenExpires,
      sessionToken: sessionToken,
      sessionTokenExpires: sessionTokenExpires,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user?.passwordHash !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async refreshToken(
    payload: TokenPayloadDto,
    refreshSessionTokenInfo: boolean,
    refreshRefreshTokenInfo: boolean,
  ): Promise<LoginResponseDto> {
    if (payload.refresh) {
      if (!payload.email) {
        throw new UnauthorizedException('Missing information in token payload');
      }
      const user = await this.usersService.findByEmail(payload.email);
      if (user == undefined || !user) {
        throw new UnauthorizedException();
      }

      let finalResponse: LoginResponseDto = {};

      if (refreshRefreshTokenInfo) {
        const { token: token, expiresIn: tokenExpires } =
          await this.jwtService.getRefreshToken(
            this.jwtService.defaultPayload(user, true),
          );
        finalResponse = {
          ...finalResponse,
          refreshToken: token,
          refreshTokenExpires: tokenExpires,
        };
      }

      if (refreshSessionTokenInfo) {
        const { token: token, expiresIn: tokenExpires } =
          await this.jwtService.getSessionToken(
            this.jwtService.defaultPayload(user, false),
          );
        finalResponse = {
          ...finalResponse,
          sessionToken: token,
          sessionTokenExpires: tokenExpires,
        };
      }

      return finalResponse;
    }
    throw new UnauthorizedException('Token is not a refresh token');
  }
}
