import { Injectable, Logger, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService extends Logger {
  levels: LogLevel[] = undefined;

  setLogLevels(levels: LogLevel[]): void {
    this.levels = levels;
  }

  error(message: any, trace?: string, context?: string): void {
    if (this.isLogLvlEnabled('error')) {
      Logger.error(message, trace, context || this.context);
    }
  }

  warn(message: any, context?: string): void {
    if (this.isLogLvlEnabled('warn')) {
      Logger.warn(message, context || this.context);
    }
  }

  log(message: any, context?: string): void {
    if (this.isLogLvlEnabled('log')) {
      Logger.log(message, context || this.context);
    }
  }

  debug(message: any, context?: string): void {
    if (this.isLogLvlEnabled('debug')) {
      Logger.debug(message, context || this.context);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.isLogLvlEnabled('verbose')) {
      Logger.verbose(message, context || this.context);
    }
  }

  private isLogLvlEnabled(level: LogLevel): boolean {
    return (this.levels || (Logger as any).logLevels).includes(level);
  }
}
