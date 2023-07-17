const TAG = "BootWorker: ";
const SUBGROUP = "lnk";
const URLKEY = "URLKEY";

((_, LG, WN, ER) => {
  _.log = LG;
  _.warn = WN;
  _.error = ER;

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

          LG(TAG + "Importando scrips.")

          importScripts("common.js?v=9");
          importScripts("parser.js?v=" + _.uid());

          LG(TAG + "Inicializando.");

          _.bootdata = dt.bootdata;
          _.location = dt.location;

          LG(TAG + "Obtendo configuração.");

          _.batchLoad("Require", [
            _.bootdata.root + "/cfg.json",
            { "required": 0, "URLKEY": _.bootdata.cfg.custom },
            { "required": 0, "URLKEY": _.bootdata.cfg.more }
          ], r => r.json()).then((x) => {
            _.cfg = mergeObj(x[0], x[1]);
          })

          break;

        default:
          break;
      }
    })(e.data);
  });

  _.batchLoad = async (id, list, clbackEach, async) => {
    async = typeof async === "undefined" ? false : async;
    const _clbackEach = (typeof clbackEach === 'function') ? clbackEach : (x) => { return x; };

    LG(TAG + (async ? "Async" : "Sync") + " downloading batch '" + id + "' .");

    var _completed = 0;
    var _total = 0;

    const EachProgress = (r) => {
      return _clbackEach(r, ++_completed, _total);
    }

    const incTotal = (len) => {
      _total += isFinite(len) ? len : 0;
    }

    return new Promise((OK, FAIL) => {
      var resps = [];

      (function (l, rasync, nosum, required, ignoreCheck) {
        const CALLER = arguments;

        nosum = nosum === true || nosum >= 1 ? true : false;
        required = required === true || required >= 1 ? true : false;
        ignoreCheck = ignoreCheck === true || ignoreCheck >= 1 ? true : false;

        if (
          ((typeof l !== "object") && (typeof l !== "string") && !Array.isArray(l)) ||
          ((Array.isArray(l)) && (l.length == 0)) ||
          ((!Array.isArray(l)) && (typeof l !== "string") && (!l.hasOwnProperty(SUBGROUP) || l[SUBGROUP].length == 0) && (!l.hasOwnProperty(URLKEY) || l[URLKEY].length == 0))
        ) return;

        /* RECALL IF IS OBJECT */
        if ((typeof l === "object") && l.hasOwnProperty(SUBGROUP)) {
          return CALLER.callee(l[SUBGROUP], l.async);
        }

        /* set default local equal a global parameter */
        rasync = typeof rasync === "undefined" ? async : rasync;

        /* MULTIPLE list item OR one ITEM
         * It can be
         *
         * [1] a nested array (arrays of array urls alternatives),
         * [2] an array of strings,
         * [3] an array of objects,
         *
         * [4] be an object with URLKEY property
         * [5] be a string
         *
         */
        if (Array.isArray(l)) {
          if (!nosum) incTotal(l.length);

          /* ONE ITEM */
        } else {
          /* only two possibilities remained: 4 or 5 */
          l = [l]; /* force convert from 4 or 5 to (2 or 3) */
        }

        /*
         * get one item, with or without alternative urls
         *
         * It can be
         *
         * [A] array of String: the list of alternate URLs for an item, or
         * [B] = 4,
         * [C] = 5
         */
        let iurl = l.shift();

        /* "4" or "B" possibility, Object.URLKEY */
        /* convert to "A" */
        if ((typeof iurl === "object") && iurl.hasOwnProperty(URLKEY)) {
          return CALLER.callee(iurl[URLKEY], l.async, false, iurl.hasOwnProperty('require') ? iurl.require : 1);
        }

        /* "5" -> "C" possibility, STRING, */
        /* convert to "A" */
        if ((typeof iurl === "string")) {
          iurl = [iurl];
        } else if (!Array.isArray(iurl)) {
          throw (TAG + "Unforeseen possibility in 'batchLoad'");
        }

        /* IGNORE "" URL */
        const lnk = (() => {
          let x = "";
          while (x.length == 0 && iurl.length > 0) {
            x = iurl.shift().trim();
          }
          return x;
        })();

        /* DONT LOAD "" PAGE */
        if (lnk.length == 0) {
          return CALLER.callee(l);
        }

        LG(TAG + "Trying to get '" + lnk + "'.");

        fetch(lnk)
          .catch(() => {
            if (iurl.length > 0) {
              WN(TAG + "Failed to get '" + lnk + "', trying alternative.");
              return CALLER.callee([urls].concat(l), rasync, true);
            }

            ER(TAG + "Failed to get bach '" + id + "', item '" + iurl.URLKEY + "'");
            FAIL(e);
          })
          .then((r) => {
            LG(TAG + "Loaded '" + lnk + "'.");
            resps.push(EachProgress(r));

            if (l.length == 0) {
              LG(TAG + "'" + id + "' batch finished.");
              return OK(resps);
            }

            /* CALL NEXT IF SYNC */
            if (!rasync) {
              CALLER.callee(l);
            }
          });

        /* CALL NEXT IF ASYNC */
        if (rasync) {
          CALLER.callee(l);
        }
      })(list, async);
    });
  };

  _.afterCFG = () => {
    _.replacement = Object.assign({}, _.cfg.URLKEY.sym);
    _.replacement.lib = Object.assign({}, _.cfg.lib);
    _.replacement.boot = _.bootroot;
    _.replacement.customroot = _.boot_customcfg.replace(/\/[^\/]+/, '');
    _.replacement = Object.assign(_.replacement, _.cfg);

    JSON.stringify(_.cfg).parseText(_.replacement).then((x) => {
      x = x.replace(/\s*\/\//gi, "https://");
      _.cfg = JSON.parse(x);
    });
  };

  _.addEventListener('fetch', function (e) {
    WN('Fetching "' + e.request + '"');
  });

})(self, console.log, console.warn, console.error);