import { HashModule } from '../hash/hash.module';
import { HashService } from '../hash/services/hash.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HashModule],
  exports: [],
  controllers: [UserController],
  providers: [UserService, HashService],
})
export class UserModule {}
