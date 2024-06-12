import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { PrismaService } from 'src/data/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private dataSource: PrismaService) {}

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
}
