import { CustomLoggerModule } from './logger/custom-logger.module';
import { EmailModule } from './modules/email/email.module';
import { TokenModule } from './modules/token/token.module';
import { HashModule } from './modules/hash/hash.module';
import { DatabaseModule } from './data/database.module';
import { AppConfigModule } from './config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CustomLoggerModule,
    EmailModule,
    TokenModule,
    HashModule,
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
