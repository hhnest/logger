import { Injectable, Logger, Scope } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService extends Logger {
  levels: LogLevel[] = undefined;

  setLevels(levels: LogLevel[]): void {
    this.levels = levels;
  }

  error(message: any, trace?: string, context?: string): void {
    if (!this.levels || this.levels.includes('error')) {
      super.error(message, trace, context);
    }
  }
  log(message: any, context?: string): void {
    if (!this.levels || this.levels.includes('log')) {
      super.log(message, context);
    }
  }
  warn(message: any, context?: string): void {
    if (!this.levels || this.levels.includes('warn')) {
      super.warn(message, context);
    }
  }
  debug(message: any, context?: string): void {
    if (!this.levels || this.levels.includes('debug')) {
      super.debug(message, context);
    }
  }
  verbose(message: any, context?: string): void {
    if (!this.levels || this.levels.includes('verbose')) {
      super.verbose(message, context);
    }
  }
}
