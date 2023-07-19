const LOG = console.log;
const WARN = console.warn;
const ERROR = console.error;

const TAG = "BootWorker: ";
const SUBGROUP = "lnk";
const URLKEY = "URLKEY";

((_, LG, WN, ER) => {
  _.started = false;
  _.cfg = 0;
  _.replacement = {};
  _.bootdata;
  _.location;

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

  _.addEventListener("message", function (e) {
    if (!e.data || !e.data.hasOwnProperty("cmd")) {
      return;
    }

    ((dt) => {
      switch (dt.cmd.trim().toLowerCase()) {
        case "start":
          if (_.started) {
            return;
          }

          _.started = true;

          LG(TAG + "Importando scrips.");

          importScripts("common.js?v=9");
          importScripts("batchLoad.js?v=" + _.uid());
          importScripts("stringTransform.js?v=" + _.uid());

          LG(TAG + "Initializing.");

          _.bootdata = dt.bootdata;
          _.location = dt.location;

          LG(TAG + "Getting configuration.");
          LG("----");
          _.batchLoad(
            "CFG",
            [
              _.bootdata.root + "/cfg.json",
              _.bootdata.cfg.custom,
              _.bootdata.cfg.more,
            ],
            (r) => r.json(),
          ).then((x) => {
            _.setWorker(mergeObj(x[0], x[1], x.length > 2 ? x[2] : []));
            LG("9888");
          });
          LG(7777);

          break;

        default:
          break;
      }
    })(e.data);
  });

  _.setWorker = (cfg) => {
    LG("1111");
    _.replacement = Object.assign({}, cfg.url.sym);
    _.replacement.lib = Object.assign({}, cfg.lib);
    _.replacement.boot = _.bootdata.root;
    _.replacement.customroot = _.bootdata.cfg.customroot;
    _.replacement = Object.assign(_.replacement, cfg);

    JSON.stringify(cfg)
      .parseText(_.replacement)
      .then((x) => {
        x = x.replace(/\s*\/\//g, "https://");
        _.cfg = JSON.parse(x);
        LG(TAG + "Boot Configurations is ready.");
        _.postMessage({ cmd: "load_parserURLworker" });
      });
  };

  _.addEventListener("fetch", function (e) {
    WN('Fetching "' + e.request + '"');
  });
})(self, LOG, WARN, ERROR);
