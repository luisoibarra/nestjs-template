import { BaseException } from './base-error.exception';
import { CommonServerErrorCodes } from './common-error-codes';

export class EntityNotFoundError extends BaseException {
  constructor(
    public message: string,
    public stack?: string,
  ) {
    super(CommonServerErrorCodes.ENTITY_NOT_FOUND_ERROR, message, stack);
  }
}
