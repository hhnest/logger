import { Controller, Get, Logger, LogLevel, Param } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { LoggerService } from './logger.service';
import { prefixesForLoggers } from './logger.decorator';

@Controller('logger')
export class LoggerController {

  constructor(
    private readonly moduleRef: ModuleRef
  ) {
  }

  @Get()
  logLevels(): {context: string, levels: LogLevel[]}[] {
    const result = [{context: 'RootLogger', levels: (Logger as any).logLevels}];
    result.push(...prefixesForLoggers.map(ctx => {
      const logger: LoggerService = this.moduleRef.get(`Log${ctx}`);
      const levels: LogLevel[] = logger.levels || (Logger as any).logLevels;
      return {context: ctx, levels};
    }));
    return result;
  }

  @Get('level/:level')
  setLogLevel(@Param('level') level: string) {
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
    Logger.overrideLogger(levels || ['error', 'warn', 'log', 'debug']);
    const lvls: LogLevel[] = (Logger as any).logLevels;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get('context/:context')
  getLogContextLevel(@Param('context') context: string) {
    const logger: LoggerService = this.moduleRef.get(`Log${context}`);
    return logger.levels || (Logger as any).logLevels;
  }

  @Get('context/:context/level/:level')
  setLogContextLevel(@Param('context') context: string, @Param('level') level: string) {
    const logger: LoggerService = this.moduleRef.get(`Log${context}`);
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
    logger.setLogLevels(levels);
    const lvls: LogLevel[] = logger.levels || (Logger as any).logLevels;
    this.showLogs(logger, context, lvls);
    return lvls;
  }

  private showLogs(logger: Logger, context: string, levels: LogLevel[]) {
    console.log(`Log levels for '${context}' set to [${levels.join(', ')}]`);
    logger.verbose(`This is the verbose level log.`)
    logger.debug(`This is the debug level log.`)
    logger.log(`This is the log level log.`)
    logger.warn(`This is the warn level log.`)
    logger.error(`This is the error level log.`)
  }
}
