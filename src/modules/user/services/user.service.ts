import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { PrismaService } from 'src/data/services/prisma.service';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserErrorCodes } from '../errors/user-error-codes';
import { HashService } from 'src/modules/hash/services/hash.service';
import { EmailTemplateService } from 'src/modules/email/services/email-template.service';
import { SendEmailService } from 'src/modules/email/services/send-email.service';
import { AppConfigService } from 'src/config/services/app-config.service';
import { TokenService } from 'src/modules/token/services/token.service';
import { TokenType } from 'src/modules/token/dto/token-payload.interface';
import { MyLogger } from 'src/logger/services/custom-logger.service';

@Injectable()
export class UserService {
  constructor(
    private dataSource: PrismaService,
    private hashService: HashService,
    private emailTemplateService: EmailTemplateService,
    private sendEmailService: SendEmailService,
    private tokenService: TokenService,
    private loggerService: MyLogger,
    private configService: AppConfigService,
  ) {
    loggerService.setContext('UserService');
  }

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
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        passwordHash: user.password,
      },
    });

    const name = `${user.firstName} ${user.lastName}`;
    const url = this.configService.getHttpConfig().url;
    const token = await this.tokenService.generateOrGetActiveToken(
      createdUser.id,
      TokenType.EmailVerification,
    );
    const finalUrl = `${url}/user/verify-email?token=${token.token}`;
    this.loggerService.log(
      `Verification Email Link ${finalUrl} for ${user.email}`,
    );
    const email =
      await this.emailTemplateService.interpolateEmailVerificationTemplate(
        name,
        finalUrl,
      );
    const from = this.configService.getEmailConfig().from;
    await this.sendEmailService.sendEmail(
      email.subject,
      email.body,
      from,
      [user.email],
      [],
      [],
    );
    return createdUser as User;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const tokenInfo = await this.tokenService.getTokenInfo(token);
    if (tokenInfo) {
      const user = await this.findOne(tokenInfo.userId);
      if (user) {
        if (
          await this.tokenService.markTokenAsUsedIfValid(tokenInfo, [
            TokenType.EmailVerification,
          ])
        ) {
          await this.dataSource.user.update({
            where: {
              id: user.id,
            },
            data: {
              emailVerified: true,
            },
          });
          return true;
        }
      }
    }
    return false;
  }

  async sendResetPasswordEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (user) {
      const name = `${user.firstName} ${user.lastName}`;
      const url = this.configService.getHttpConfig().url;
      const token = await this.tokenService.generateOrGetActiveToken(
        user.id,
        TokenType.PasswordRecovery,
      );
      const finalUrl = `${url}/user/password-recovery?token=${token.token}`;
      this.loggerService.log(
        `Verification Email Link ${finalUrl} for ${user.email}`,
      );
      const email =
        await this.emailTemplateService.interpolateEmailVerificationTemplate(
          name,
          finalUrl,
        );
      const from = this.configService.getEmailConfig().from;
      await this.sendEmailService.sendEmail(
        email.subject,
        email.body,
        from,
        [user.email],
        [],
        [],
      );
      return true;
    }
    return false;
  }

  async resetPassword(newPassword: string, token: string): Promise<boolean> {
    const tokenInfo = await this.tokenService.getTokenInfo(token);
    if (tokenInfo) {
      const user = await this.findOne(tokenInfo.userId);
      if (user) {
        if (
          await this.tokenService.markTokenAsUsedIfValid(tokenInfo, [
            TokenType.PasswordRecovery,
          ])
        ) {
          // Update user password
          const newPasswordHash =
            await this.hashService.generateHash(newPassword);
          await this.dataSource.user.update({
            where: {
              id: user.id,
            },
            data: {
              passwordHash: newPasswordHash,
            },
          });
          return true;
        }
      }
    }
    return false;
  }
}
