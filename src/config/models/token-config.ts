import { IsNumber, Min } from 'class-validator';

export class TokenConfig {
  @IsNumber()
  @Min(0)
  defaultTokenExpirationInSeconds: number;
}
