import { AppConfigService } from './services/app-config.service';
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import configuration from './configuration';

@Global() // makes the module available globally for other modules once imported in the app modules
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
