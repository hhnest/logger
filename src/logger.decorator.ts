import { Inject } from '@nestjs/common';

export const contextLoggers: string[] = new Array<string>();

export function Log(context = '') {
  if (!contextLoggers.includes(context)) {
    contextLoggers.push(context);
  }
  return Inject(`Log${context}`);
}
