import { TokenService } from './services/token.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  exports: [TokenService],
  controllers: [],
  providers: [TokenService],
})
export class TokenModule {}
