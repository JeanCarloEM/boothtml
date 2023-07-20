//const { minify } = require("minify");
const { Glob } = require("glob");
const { readFile, writeFile } = require('fs');
const tryToCatch = require('try-to-catch');

const g = new Glob('dist/**/*.js', {
  ignore: {
    ignored: p => /\.min\.js/i.test(p.name)
  }
})
// glob objects are async iterators, can also do globIterate() or
// g.iterate(), same deal
for (const file of g) {
  readFile(file, 'utf-8', function (err, ctt) {
    if (err) {
      console.log(err);
      return;
    }

    tryToCatch(minify, './client.js', options);

  });
}