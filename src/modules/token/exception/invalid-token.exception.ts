import { BaseException } from 'src/common/errors/base-error.exception';

export class InvalidTokenError extends BaseException {
  constructor(
    public errorCode: string,
    message?: string,
    public stack?: string,
  ) {
    super(errorCode, message ?? 'Invalid Token', stack);
  }
}
