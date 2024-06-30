import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/data/services/prisma.service';
import { randomBytes } from 'crypto';
import { AppConfigService } from 'src/config/services/app-config.service';
import { TokenPayload, TokenType } from '../dto/token-payload.interface';
import { Token } from '../entities/token.entity';
import { MyLogger } from 'src/logger/services/custom-logger.service';

@Injectable()
export class TokenService {
  constructor(
    private dataSource: PrismaService,
    private appConfig: AppConfigService,
    private logger: MyLogger,
  ) {
    this.logger.setContext('TokenService');
  }

  private async getActiveUserToken(
    userId: string,
    tokenType: TokenType,
  ): Promise<Token | undefined> {
    const tokens = await this.dataSource.token.findMany({
      where: {
        userId: userId,
        payload: {
          contains: tokenType.toString(),
        },
        expires: {
          gt: new Date(),
        },
        active: true,
      },
    });
    return tokens.pop() as Token | undefined;
  }

  private tokenValid(token: Token, validTypes: TokenType[]): boolean {
    let validForTypes = false;
    try {
      const payload = JSON.parse(token.payload) as TokenPayload;
      validForTypes = payload.tokenType in validTypes;
    } catch {
      this.logger.warn(
        'Error converting token payload into TokenPayload object.',
      );
      validForTypes = false;
    }
    return token.active && token.expires > new Date() && validForTypes;
  }

  async generateOrGetActiveToken(
    userId: string,
    tokenType: TokenType,
  ): Promise<Token> {
    console.log(crypto);
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setSeconds(
      expiresAt.getSeconds() +
        this.appConfig.getTokenConfig().defaultTokenExpirationInSeconds,
    );
    const payload = JSON.stringify(<TokenPayload>{
      tokenType: tokenType,
    });

    const active = await this.getActiveUserToken(userId, tokenType);
    if (active) {
      return active;
    }

    const tokenEntity = await this.dataSource.token.create({
      data: {
        active: true,
        userId: userId,
        token: token,
        expires: expiresAt,
        payload: payload,
      },
    });

    return tokenEntity as Token;
  }

  async getTokenInfo(token: string): Promise<Token | undefined> {
    const tokenEntity = await this.dataSource.token.findFirst({
      where: { token: token },
    });
    return tokenEntity as Token | undefined;
  }

  async markTokenAsUsedIfValid(
    tokenInfo: Token,
    tokenTypeList: TokenType[],
  ): Promise<boolean> {
    if (this.tokenValid(tokenInfo, tokenTypeList)) {
      const result = await this.dataSource.token.update({
        where: {
          id: tokenInfo.id,
        },
        data: {
          active: false,
        },
      });
      return result.active == false;
    }
    return false;
  }
}
