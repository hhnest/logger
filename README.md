<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# @hhnest/logger 

![Build](https://github.com/hhnest/logger/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/hhnest/logger/branch/master/graph/badge.svg)](https://codecov.io/gh/hhnest/logger)

## Description

A logger module for [Nest](https://github.com/nestjs/nest).

Wrap standard nestjs logger and add API for set level to runtime globally or for each logger

## Installation

```bash
$ npm install @hhnest/logger --save
```

## Import module in your the app

```typescript
import {LoggerModule} from '@hhnest/logger';
import { LogLevel } from '@nestjs/common';

const initialLevels: LogLevel[] = ['error', 'warn', 'log', 'debug'];
...
@Module({
  imports: [
    HttpModule,
    LoggerModule.forRoot(initialLevels),
    // or 
    LoggerModule.forRoot(), // ['error', 'warn', 'log']
    ...
 ],
  controllers: [...],
  providers: [...],
})
export class AppModule {
  ...
}
```

## Use

```typescript
import { Log } from '@hhnest/logger';

@Injectable()
export class MyService {

  constructor(
    @Log(MyService.name) private readonly logger
  ) {
  }
  method() {
    this.logger.error(`message`)
  }
  ...
}
```

## API

### Return global logger levels

```xpath
/logger
```


---

### Change levels of logger globally 

```xpath
/logger/level/(error|warn|log|debug|verbose|reset)
```

If specific logger has been set to another level, level of it doesn't change.

---

### Return specific logger levels 

```xpath
/logger/context/SpecificLogger
```

---

### Change level of specific logger 

```xpath
/logger/context/SpecificLogger/level/(error|warn|log|debug|verbose|reset)
```

If reset, remove specific and use global levels for it.  

---

## License

  @hhnest/logger is [MIT licensed](LICENSE).
