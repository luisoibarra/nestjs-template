import {
  Injectable,
  Scope,
  ConsoleLogger,
  LoggerService,
  LogLevel,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger implements LoggerService {
  private context?: string;

  constructor(private baseLogger: ConsoleLogger) {}

  private formatMessage(message: any): string {
    let contextPart = '';
    if (this.context) {
      contextPart = `${this.context} `;
    }
    return `${contextPart}${message}`;
  }

  setContext(contextName: string) {
    this.context = contextName;
  }

  log(message: any, ...optionalParams: any[]) {
    message = this.formatMessage(message);
    this.baseLogger.log(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    message = this.formatMessage(message);
    this.baseLogger.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    message = this.formatMessage(message);
    this.baseLogger.warn(message, ...optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    message = this.formatMessage(message);
    this.baseLogger.debug(message, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    message = this.formatMessage(message);
    this.baseLogger.verbose(message, ...optionalParams);
  }
  fatal?(message: any, ...optionalParams: any[]) {
    message = this.formatMessage(message);
    this.baseLogger.fatal(message, ...optionalParams);
  }
  setLogLevels?(levels: LogLevel[]) {
    this.baseLogger.setLogLevels(levels);
  }
}
