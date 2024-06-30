import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/services/custom-logger.service';

@Injectable()
export class SendEmailService {
  constructor(private logger: MyLogger) {
    logger.setContext('SendEmailService');
  }
  async sendEmail(
    subject: string,
    body: string,
    from: string,
    to: string[],
    cc: string[],
    bcc: string[],
  ): Promise<void> {
    // TODO Send email
    this.logger.log(`Subject: ${subject}\nTo:${to}\n${body}`);
  }
}
