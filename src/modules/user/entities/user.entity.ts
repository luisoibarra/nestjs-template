import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ITraceable } from 'src/common/interfaces/traceable';

export class User implements ITraceable {
  id: string;

  firstName: string;

  lastName: string;

  @IsEmail()
  email: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  emailVerified: boolean;

  @Exclude()
  createdAt: Date | undefined;

  @Exclude()
  updatedAt: Date | undefined;
}
