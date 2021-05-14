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
...
@Module({
  imports: [
    HttpModule,
    LoggerModule.forRoot(),
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

### /logger

Return global logger levels.

### /logger/(error|warn|log|debug|verbose|reset)

Change levels of logger globally.

If specific logger has been set to another level, level of it doesn't change.

---

### /logger/SpecificLogger/(error|warn|log|debug|verbose|reset)

Change level of specific logger.

If reset, remove specific and use global levels for it.  

---

## License

  @hhnest/logger is [MIT licensed](LICENSE).
