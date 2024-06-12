import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/services/app-config.service';

@Injectable()
export class AppJwtService {
  constructor(
    private jwtService: JwtService,
    private appConfig: AppConfigService,
  ) {}

  async getRefreshToken(payload: object): Promise<string> {
    const config = this.appConfig.getSecurityConfig();
    return await this.jwtService.signAsync(payload, {
      expiresIn: config.refreshJwtExpiresInSeconds,
    });
  }

  async getSessionToken(payload: object): Promise<string> {
    const config = this.appConfig.getSecurityConfig();
    return await this.jwtService.signAsync(payload, {
      expiresIn: config.sessionJwtExpiresInSeconds,
    });
  }
}
