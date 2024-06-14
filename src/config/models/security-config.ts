import { IsNotEmpty, IsString } from 'class-validator';

export class SecurityConfig {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  sessionJwtExpiresInSeconds: number;

  get sessionJwtExpiresInSecondsString(): string {
    return `${this.refreshJwtExpiresInSeconds}s`;
  }

  @IsString()
  @IsNotEmpty()
  refreshJwtExpiresInSeconds: number;

  get refreshJwtExpiresInSecondsString(): string {
    return `${this.refreshJwtExpiresInSeconds}s`;
  }
}
