// jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/services/app-config.service';
import { AuthTokenPayloadDto } from '../dtos/auth-token-payload.dto';
import { AuthConstants } from '../auth-constants';
import { TokenUserInfoDto } from '../dtos/token-user-info.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getSecurityConfig().jwtSecret,
    });
  }
  name: string = AuthConstants.JWT_STRATEGY;

  validate(payload: AuthTokenPayloadDto): TokenUserInfoDto {
    // More information can be added to the user here, for example, permissions and roles.
    return {
      id: payload.sub,
      email: payload.email,
      permissions: payload.permissions,
    };
  }
}
