import { DynamicModule, Module } from '@nestjs/common';
import { createLoggerProviders } from './logger.providers';
import { LoggerController } from './logger.controller';

const loggerProviders = createLoggerProviders();

@Module({
  providers: [LoggerController, ...loggerProviders],
  exports: [LoggerController, ...loggerProviders],
})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [...prefixedLoggerProviders],
      controllers: [LoggerController],
      exports: [...prefixedLoggerProviders],
    };
  }
}
