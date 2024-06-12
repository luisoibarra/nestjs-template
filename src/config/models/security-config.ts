import { IsNotEmpty, IsString } from 'class-validator';

export class SecurityConfig {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  sessionJwtExpiresInSeconds: string;

  @IsString()
  @IsNotEmpty()
  refreshJwtExpiresInSeconds: string;
}
