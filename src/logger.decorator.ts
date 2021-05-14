import { Inject } from '@nestjs/common';

export const prefixesForLoggers: string[] = new Array<string>();

export function Log(context = '') {
  if (!prefixesForLoggers.includes(context)) {
    prefixesForLoggers.push(context);
  }
  return Inject(`Log${context}`);
}
