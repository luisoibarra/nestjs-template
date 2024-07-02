import { AuthService } from './services/auth.service';
import { AppJwtService } from './services/app-jwt.service';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/config/app-config.module';
import { AppConfigService } from 'src/config/services/app-config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/services/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { HashService } from '../hash/services/hash.service';
import { HashModule } from '../hash/hash.module';
import { EmailModule } from '../email/email.module';
import { EmailTemplateService } from '../email/services/email-template.service';
import { TokenService } from '../token/services/token.service';
import { TokenModule } from '../token/token.module';
import { RolesGuard as RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    PassportModule,
    UserModule,
    HashModule,
    EmailModule,
    TokenModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        secret: configService.getSecurityConfig().jwtSecret,
      }),
    }),
  ],
  controllers: [AuthController],
  exports: [RoleGuard],
  providers: [
    UserService,
    HashService,
    AuthService,
    EmailTemplateService,
    TokenService,
    AppJwtService,
    LocalStrategy,
    JwtStrategy,
    // Register JwtAuthGuard globally to all controllers
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    RoleGuard,
  ],
})
export class AuthModule {}
