import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { PrismaService } from './services/prisma.service';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [AppConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
