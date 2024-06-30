import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from '../models/security-config';
import { ConfigConstants } from '../config-constants';
import { EnvConfig } from '../models/env-config';
import { HttpConfig } from '../models/http-config';
import { TokenConfig } from '../models/token-config';
import { EmailConfig } from '../models/email-config';

@Injectable()
export class AppConfigService {
  constructor(private baseConfig: ConfigService) {}
  get<T>(key: string): T | undefined {
    return this.baseConfig.get<T>(key);
  }

  getSecurityConfig(): SecurityConfig {
    return this.get<SecurityConfig>(ConfigConstants.SECURITY_KEY)!;
  }

  getEnvironmentConfig(): EnvConfig {
    return this.get<EnvConfig>(ConfigConstants.ENVIRONMENT_KEY)!;
  }

  getHttpConfig(): HttpConfig {
    return this.get<HttpConfig>(ConfigConstants.HTTP_KEY)!;
  }

  getTokenConfig(): TokenConfig {
    return this.get<TokenConfig>(ConfigConstants.TOKEN_KEY)!;
  }

  getEmailConfig(): EmailConfig {
    return this.get<EmailConfig>(ConfigConstants.EMAIL_KEY)!;
  }
}
