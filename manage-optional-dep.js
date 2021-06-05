"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
fs.readFile('./dist/logger.controller.js', 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/const swagger_1 = require\("@nestjs\/swagger"\);/, `let swagger_1 = {ApiTags: (val) => null};
try {swagger_1 = require("@nestjs/swagger");} catch(e) {}`
  ).replace(/], LoggerController\);/, `].filter((d) => !!d), LoggerController);`);
  fs.writeFile('./dist/logger.controller.js', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});





