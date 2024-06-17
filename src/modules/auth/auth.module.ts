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

@Module({
  imports: [
    PassportModule,
    UserModule,
    HashModule,
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
  providers: [
    UserService,
    HashService,
    AppConfigService,
    AuthService,
    AppJwtService,
    LocalStrategy,
    JwtStrategy,
    // Register JwtAuthGuard globally to all controllers
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
