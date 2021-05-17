import { Controller, Get, Header, HostParam, Logger, LogLevel, Param, Req } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { LoggerService } from './logger.service';
import { contextLoggers } from './logger.decorator';

@Controller('logger')
export class LoggerController {

  constructor(
    private readonly moduleRef: ModuleRef
  ) {
  }

  getLevel(levels: LogLevel[]): LogLevel {
    if (levels.includes('verbose')) {
      return 'verbose';
    }
    if (levels.includes('debug')) {
      return 'debug';
    }
    if (levels.includes('log')) {
      return 'log';
    }
    if (levels.includes('warn')) {
      return 'warn';
    }
    if (levels.includes('error')) {
      return 'error';
    }
  }

  getApi(context: string) {
    return ['log', 'error', 'warn', 'debug', 'verbose'].map((level: LogLevel) => !!context ? `${context}/level/${level}` : `level/${level}`);
  }

  @Get()
  @Header('Content-type', 'application/json')
  logLevels(): {context: string, level: LogLevel, api: string[]}[] {
    const result = [{context: 'RootLogger', level: this.getLevel((Logger as any).logLevels), api: this.getApi(undefined)}];
    result.push(...contextLoggers.map((context: string) => this.getLogContextLevel(context)));
    return result;
  }

  @Get('level/:level')
  @Header('Content-type', 'application/json')
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

  @Get(':context')
  @Header('Content-type', 'application/json')
  getLogContextLevel(@Param('context') context: string) {
    const logger: LoggerService = this.moduleRef.get(`Log${context}`);
    const levels = logger.levels || (Logger as any).logLevels;
    return {context, level: this.getLevel(levels), api: this.getApi(context)}
  }

  @Get(':context/level/:level')
  @Header('Content-type', 'application/json')
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
