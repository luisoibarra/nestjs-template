import { Injectable } from '@nestjs/common';
import { InterpolatedEmailDto } from '../dtos/interpolated-email.dto';
import { PrismaService } from 'src/data/services/prisma.service';
import Handlebars from 'handlebars';
import { EntityNotFoundError } from 'src/common/errors/entity-not-found.exception';
import { EmailConstants } from '../email-constants';

@Injectable()
export class EmailTemplateService {
  constructor(private dataSource: PrismaService) {}
  async interpolateTemplate(
    templateName: string,
    data: object,
  ): Promise<InterpolatedEmailDto> {
    const template = await this.dataSource.emailTemplate.findFirst({
      where: {
        templateName: templateName,
      },
    });
    if (template) {
      const compiledTemplate = Handlebars.compile(template.template);
      const compiledSubject = Handlebars.compile(template.subject);
      const html = compiledTemplate(data);
      const subject = compiledSubject(data);
      return {
        body: html,
        subject: subject,
      };
    } else {
      throw new EntityNotFoundError('Requested template not found');
    }
  }

  interpolatePasswordRecoveryTemplate(
    name: string,
    resetPasswordUrl: string,
  ): Promise<InterpolatedEmailDto> {
    return this.interpolateTemplate(
      EmailConstants.PASSWORD_RECOVERY_TEMPLATE_NAME,
      {
        name: name,
        resetPasswordUrl: resetPasswordUrl,
      },
    );
  }

  interpolateEmailVerificationTemplate(
    name: string,
    verificationUrl: string,
  ): Promise<InterpolatedEmailDto> {
    return this.interpolateTemplate(
      EmailConstants.EMAIL_VERIFICATION_TEMPLATE_NAME,
      {
        name: name,
        verificationUrl: verificationUrl,
      },
    );
  }
}
