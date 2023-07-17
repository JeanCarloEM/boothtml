((_, LG, WN, ER) => {
  _.batchLoad = async (id, list, clbackEach, async) => {
    async = typeof async === "undefined" ? false : async;
    const _clbackEach = (typeof clbackEach === 'function') ? clbackEach : (x) => { return x; };

    LG(TAG + (async ? "Async" : "Sync") + " downloading batch '" + id + "' .");

    var _completed = 0;
    var _total = 0;

    const EachProgress = async (r) => {
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

        const gogo = () => {
          if (l.length == 0) {
            LG(TAG + "'" + id + "' batch finished.");
            return OK(resps);
          }

          /* CALL NEXT IF SYNC */
          if (!rasync) {
            CALLER.callee(l);
          }
        };

        /* DONT LOAD "" PAGE */
        if (lnk.length == 0) {
          return gogo();
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
            let rr = EachProgress(r);

            if ((typeof rr === 'object' && typeof rr.then === 'function')) {
              return rr.then((x) => {
                resps.push(x);
                gogo();
              });
            }

            resps.push(rr);
            gogo();
          });

        /* CALL NEXT IF ASYNC */
        if (rasync) {
          CALLER.callee(l);
        }
      })(list, async);
    });
  };

})(self, LOG, WARN, ERROR);