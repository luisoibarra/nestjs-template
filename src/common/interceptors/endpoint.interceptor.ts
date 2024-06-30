import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MyLogger } from 'src/logger/services/custom-logger.service';

export class EndpointInterceptor implements NestInterceptor {
  constructor(private logger: MyLogger) {
    this.logger.setContext('Endpoint Interceptor');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    this.logger.log(`Request: ${method} ${url}`);

    return next.handle().pipe(
      map(() => {
        const response = context.switchToHttp().getResponse();
        this.logger.log(
          `Response: ${response.statusCode} ${method} ${url} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
