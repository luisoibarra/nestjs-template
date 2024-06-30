import { IsIP, IsNotEmpty, IsNumber, IsUrl, Max, Min } from 'class-validator';

export class HttpConfig {
  @IsNumber()
  @Min(0)
  @Max(65535)
  port: number;

  @IsIP()
  @IsNotEmpty()
  host: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
