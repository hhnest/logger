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

  @Get(':level')
  setLogLevelDebug(@Param('level') level: LogLevel) {
    const levels: LogLevel[] = [];
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
        levels.push('error', 'warn', 'log', 'debug');
    }
    Logger.overrideLogger(levels);
    return levels;
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
