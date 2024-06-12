import { AppConfigService } from './services/app-config.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      ignoreEnvVars: true,
      isGlobal: true,
    }),
  ],
  controllers: [],
  exports: [AppConfigService],
  providers: [AppConfigService],
})
export class AppConfigModule {}
