import { prefixesForLoggers } from './logger.decorator';
import { Logger, Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';

function createLoggerProvider(context: string): Provider<Logger> {
  return {
    provide: `Log${context}`,
    useFactory: () => new LoggerService(context),
  };
}

export function createLoggerProviders(): Array<Provider<Logger>> {
  return prefixesForLoggers.map(context => createLoggerProvider(context));
}
