import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(
    public errorCode: string,
    response: string | Record<string, any>,
    status: number,
    options?: HttpExceptionOptions,
  ) {
    super(response, status, options);
  }
}
