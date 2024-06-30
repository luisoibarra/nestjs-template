import { InterpolatedEmailDto } from './interpolated-email.dto';

export class SendEmailInfoDto {
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  emailContent: InterpolatedEmailDto;
}
