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
      Logger.error(message, trace, `[ERROR  ] ${context || this.context}`);
    }
  }

  warn(message: any, context?: string): void {
    if (this.isLogLvlEnabled('warn')) {
      Logger.warn(message, `[WARN   ] ${context || this.context}`);
    }
  }

  log(message: any, context?: string): void {
    if (this.isLogLvlEnabled('log')) {
      Logger.log(message, `[LOG    ] ${context || this.context}`);
    }
  }

  debug(message: any, context?: string): void {
    if (this.isLogLvlEnabled('debug')) {
      Logger.debug(message, `[DEBUG  ] ${context || this.context}`);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.isLogLvlEnabled('verbose')) {
      Logger.verbose(message, `[VERBOSE] ${context || this.context}`);
    }
  }

  private isLogLvlEnabled(level: LogLevel): boolean {
    return (this.levels || (Logger as any).logLevels).includes(level);
  }
}
