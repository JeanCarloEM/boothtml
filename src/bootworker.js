((_, L, W, E) => {
  _.log = L;
  _.warn = W;
  _.error = E;

  _.started = false;

  _.cfg = 0;

  _.replacement = {};

  _.bootroot;
  _.location;
  _.boot_customcfg;

  const mergeObj = function (...x) {
    let to = {};

    for (var i = arguments.length - 1; i >= 0; i--) {
      let ks = Object.keys(arguments[i]);

      for (let k = 0; k < ks.length; k++) {
        if (!to.hasOwnProperty(ks[k])) {
          to[ks[k]] = JSON.parse(JSON.stringify(arguments[i][ks[k]]));
          continue;
        }

        if (Array.isArray(arguments[i][ks[k]]) && Array.isArray(to[ks[k]])) {
          to[ks[k]] = to[ks[k]].concat(arguments[i][ks[k]]);
        } else if (typeof arguments[i][ks[k]] === "object") {
          to[ks[k]] = mergeObj(to[ks[k]], arguments[i][ks[k]]);
        }
      }
    }

    return to;
  };

  _.addEventListener('message', function (e) {
    if (!e.data || !e.data.hasOwnProperty('cmd')) {
      return;
    };

    ((dt) => {
      switch (dt.cmd.trim().toLowerCase()) {
        case "start":
          if (_.started) {
            return;
          }

          _.started = true;

          L("BootWorker: importando scrips...")

          importScripts("common.js?v=9");
          importScripts("parser.js?v=" + _.uid());

          L("BootWorker: Inicializando...");

          _.bootroot = dt.bootroot;
          _.location = dt.location;
          _.boot_customcfg = dt.boot_customcfg;


          L("BootWorker: Getting default CFG '" + _.bootroot + "/cfg.json'");
          fetch(_.bootroot + "/cfg.json?v=" + _.uid())
            .catch(() => {

            })
            .then(r => r.json())
            .then((r1) => {
              L("BootWorker: Getting custom CFG '" + _.boot_customcfg + "'");
              fetch(_.boot_customcfg + "?v=" + _.uid())
                .catch(() => {

                })
                .then(r => r.json())
                .then((r2) => {
                  _.cfg = mergeObj(r1, r2);

                  _.replacement = Object.assign({}, _.cfg.url.sym);
                  _.replacement.lib = Object.assign({}, _.cfg.lib);
                  _.replacement.boot = _.bootroot;
                  _.replacement.customroot = _.boot_customcfg.replace(/\/[^\/]+/, '');
                  _.replacement = Object.assign(_.replacement, _.cfg);

                  JSON.stringify(_.cfg).parseText(_.replacement).then((x) => {
                    x = x.replace(/\s*\/\//gi, "https://");
                    _.cfg = JSON.parse(x);
                  });
                });
            });

          break;

        default:
          break;
      }
    })(e.data);
  });

  _.addEventListener('fetch', function (e) {
    W('Fetching "' + e.request + '"');
  });

})(self, console.log, console.warn, console.error);