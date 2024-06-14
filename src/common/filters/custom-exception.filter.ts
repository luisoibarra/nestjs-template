import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseHttpException } from '../errors/base-http-exception.exception';
import { BaseException } from '../errors/base-error.exception';
import { CommonServerErrorCodes } from '../errors/common-error-codes';

@Catch(BaseHttpException, HttpException, BaseException, Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(
    exception: BaseHttpException | HttpException | BaseException | Error,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorCode =
      exception instanceof BaseHttpException ||
      exception instanceof BaseException
        ? exception.errorCode
        : CommonServerErrorCodes.UNEXPECTED_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorCode: errorCode,
      message: exception.message,
    });
  }
}
