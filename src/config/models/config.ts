import { IsInstance } from 'class-validator';
import { HttpConfig } from './http-config';
import { EnvConfig } from './env-config';
import { SecurityConfig } from './security-config';
import { TokenConfig } from './token-config';
import { EmailConfig } from './email-config';

export class Config {
  @IsInstance(EnvConfig)
  environment: EnvConfig;
  @IsInstance(SecurityConfig)
  security: SecurityConfig;
  @IsInstance(HttpConfig)
  http: HttpConfig;
  @IsInstance(TokenConfig)
  token: TokenConfig;
  @IsInstance(EmailConfig)
  email: EmailConfig;
}
