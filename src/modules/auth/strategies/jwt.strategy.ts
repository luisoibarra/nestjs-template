// jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/services/app-config.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { AuthConstants } from '../auth-constants';
import { User } from 'src/modules/user/entities/user.entity';

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

  async validate(payload: TokenPayloadDto) {
    // More information can be added to the user here, for example, permissions and roles.
    return { id: payload.sub, email: payload.email };
  }
}
