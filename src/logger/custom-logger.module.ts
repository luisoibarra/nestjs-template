import { ConsoleLogger, Global, Module } from '@nestjs/common';
import { MyLogger } from './services/custom-logger.service';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [],
  providers: [MyLogger, ConsoleLogger],
  exports: [MyLogger],
})
export class CustomLoggerModule {}
