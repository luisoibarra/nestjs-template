import { EmailModule } from '../email/email.module';
import { EmailTemplateService } from '../email/services/email-template.service';
import { SendEmailService } from '../email/services/send-email.service';
import { HashModule } from '../hash/hash.module';
import { HashService } from '../hash/services/hash.service';
import { TokenService } from '../token/services/token.service';
import { TokenModule } from '../token/token.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HashModule, EmailModule, TokenModule],
  exports: [],
  controllers: [UserController],
  providers: [
    UserService,
    HashService,
    EmailTemplateService,
    SendEmailService,
    TokenService,
  ],
})
export class UserModule {}
