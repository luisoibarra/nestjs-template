export enum TokenType {
  PasswordRecovery = 'PasswordRecovery',
  EmailVerification = 'EmailVerification',
}

export interface TokenPayload {
  tokenType: TokenType;
}
