import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/services/app-config.service';
import { User } from 'src/modules/user/entities/user.entity';
import { TokenPayloadDto } from '../dtos/token-payload.dto';

@Injectable()
export class AppJwtService {
  constructor(
    private jwtService: JwtService,
    private appConfig: AppConfigService,
  ) {}

  defaultPayload(user: User, refresh: boolean): TokenPayloadDto {
    return {
      sub: user.id,
      email: user.email,
      refresh: refresh,
    };
  }

  async getRefreshToken(
    payload: TokenPayloadDto,
  ): Promise<{ token: string; expiresIn: Date }> {
    const config = this.appConfig.getSecurityConfig();
    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: config.refreshJwtExpiresInSecondsString,
      }),
      expiresIn: new Date(
        new Date().getTime() + config.refreshJwtExpiresInSeconds * 1000,
      ), // now + X seconds
    };
  }

  async getSessionToken(
    payload: TokenPayloadDto,
  ): Promise<{ token: string; expiresIn: Date }> {
    const config = this.appConfig.getSecurityConfig();
    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: config.sessionJwtExpiresInSecondsString,
      }),
      expiresIn: new Date(
        new Date().getTime() + config.sessionJwtExpiresInSeconds * 1000,
      ), // now + X seconds
    };
  }
}
