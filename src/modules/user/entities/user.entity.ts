import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class User {
  id: string;

  name: string;

  @IsEmail()
  email: string;

  @Exclude()
  passwordHash: string;
}
