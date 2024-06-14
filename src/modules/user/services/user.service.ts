import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { PrismaService } from 'src/data/services/prisma.service';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserErrorCodes } from '../errors/user-error-codes';
import { HashService } from 'src/modules/hash/services/hash.service';

@Injectable()
export class UserService {
  constructor(
    private dataSource: PrismaService,
    private hashService: HashService,
  ) {}

  async findOne(id: string): Promise<User | null> {
    const user = await this.dataSource.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return user as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.dataSource.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
    return user as User;
  }

  async registerUser(user: UserRegisterDto): Promise<User> {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new Error(UserErrorCodes.EXISTING_USER);
    }

    user.password = await this.hashService.generateHash(user.password);

    const createdUser = await this.dataSource.user.create({
      data: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        passwordHash: user.password,
      },
    });
    return createdUser as User;
  }
}
