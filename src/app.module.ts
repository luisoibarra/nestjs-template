import { DatabaseModule } from './data/database.module';
import { AppConfigModule } from './config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
