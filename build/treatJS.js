//const { minify } = require("minify");
const { Glob } = require("glob");
const { readFile, writeFile } = require('fs');
//const tryToCatch = require('try-to-catch');

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

    console.log("\n\n\n");
    console.log(file);

    const tab = /^\t/gm;
    const space =/^\s{4}/gm;

    /* Normalize ident type */
    while (ctt.match(tab)) {
      console.log("======================");
      ctt = ctt.replace(tab, "    ");
    }

    /* convert to tab */
    while (ctt.match(space)) {
      console.log("+++++++++++++++++++++++");
      ctt = ctt.replace(space, "\t")
    }

    /* convert to 2 size space */
    while (ctt.match(tab)) {
      console.log("///////////////////");
      ctt = ctt.replace(tab, "  ");
    }

    console.log("\n");
    console.log(ctt);

    writeFile(file, ctt, 'utf-8', function (err) {
      console.log(err);
    });
  });
}