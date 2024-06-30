import { Module } from '@nestjs/common';
import { EmailTemplateService } from './services/email-template.service';
import { SendEmailService } from './services/send-email.service';

@Module({
  imports: [],
  exports: [EmailTemplateService, SendEmailService],
  controllers: [],
  providers: [EmailTemplateService, SendEmailService],
})
export class EmailModule {}
