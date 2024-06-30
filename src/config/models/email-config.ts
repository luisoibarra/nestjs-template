import { IsEmail } from 'class-validator';

export class EmailConfig {
  @IsEmail()
  from: string;
}
