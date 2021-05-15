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

  readonly logger: Logger = new Logger(LoggerController.name);

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

  @Get('verbose')
  setLogLevelVerbose() {
    Logger.overrideLogger(['error', 'warn', 'log', 'debug', 'verbose']);
    const lvls: LogLevel[] = (Logger as any).logLevels;;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get('debug')
  setLogLevelDebug() {
    Logger.overrideLogger(['error', 'warn', 'log', 'debug']);
    const lvls: LogLevel[] = (Logger as any).logLevels;;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get('log')
  setLogLevelLog() {
    Logger.overrideLogger(['error', 'warn', 'log']);
    const lvls: LogLevel[] = (Logger as any).logLevels;;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get('warn')
  setLogLevelWarn() {
    Logger.overrideLogger(['error', 'warn']);
    const lvls: LogLevel[] = (Logger as any).logLevels;;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get('error')
  setLogLevelError() {
    Logger.overrideLogger(['error']);
    const lvls: LogLevel[] = (Logger as any).logLevels;;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get('reset')
  resetLogLevel() {
    Logger.overrideLogger(['error', 'warn', 'log', 'debug']);
    const lvls: LogLevel[] = (Logger as any).logLevels;;
    this.showLogs(new Logger(), 'RootLogger', lvls);
    return lvls;
  }

  @Get(':cls')
  getLogClassLevel(@Param('cls') cls: string) {
    const logger: LoggerService = this.moduleRef.get(`Log${cls}`);
    return logger.levels || (Logger as any).logLevels;
  }

  @Get(':cls/:level')
  setLogClassLevel(@Param('cls') cls: string, @Param('level') level: string) {
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
    const lvls: LogLevel[] = logger.levels || (Logger as any).logLevels;
    this.showLogs(logger, cls, lvls);
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
