import { Controller, Get, Logger, LogLevel, Param } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {

  constructor(
    private readonly moduleRef: ModuleRef
  ) {
  }

  readonly logger: Logger = new Logger(LoggerController.name);

  @Get()
  logLevel(): LogLevel[] {
    return (Logger as any).logLevels;
  }

  @Get('verbose')
  setLogLevelVerbose() {
    Logger.overrideLogger(['error', 'warn', 'log', 'debug', 'verbose']);
    return (Logger as any).logLevels;
  }

  @Get('debug')
  setLogLevelDebug() {
    Logger.overrideLogger(['error', 'warn', 'log', 'debug']);
    return (Logger as any).logLevels;
  }

  @Get('log')
  setLogLevelLog() {
    Logger.overrideLogger(['error', 'warn', 'log']);
    return (Logger as any).logLevels;
  }

  @Get('warn')
  setLogLevelWarn() {
    Logger.overrideLogger(['error', 'warn']);
    return (Logger as any).logLevels;
  }

  @Get('error')
  setLogLevelError() {
    Logger.overrideLogger(['error']);
    return (Logger as any).logLevels;
  }

  @Get('reset')
  resetLogLevel() {
    Logger.overrideLogger(['error', 'warn', 'log', 'debug']);
    return (Logger as any).logLevels;
  }

  @Get(':cls')
  setLogLevelDebug2(@Param('cls') cls: string) {
    const logger: LoggerService = this.moduleRef.get(`Log${cls}`);
    return logger.levels || (Logger as any).logLevels;
  }

  @Get(':cls/:level')
  setLogClassLevelDebug(@Param('cls') cls: string, @Param('level') level: string) {
    const logger: LoggerService = this.moduleRef.get(`Log${cls}`);
    let levels: LogLevel[] | undefined = [];
    switch (level) {
      case 'verbose':
        levels.push('verbose');
      case 'debug':
        levels.push('debug');
      case 'log':
        levels.push('log');
      case 'warn':
        levels.push('warn');
      case 'error':
        levels.push('error');
        break;
      default:
        levels = undefined;
    }
    logger.setLevels(levels);
    return logger.levels || (Logger as any).logLevels;
  }

}
