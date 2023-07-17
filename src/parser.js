(function (STR, LG, WN, E) {
  /* WARN:: Duplicate regex matching is not efficient, find a better way */
  STR.replaceAsync = async function (regex, asyncFn) {
    const promises = [];
    this.replace(regex, (match, ...args) => {
      const promise = asyncFn(match, ...args);
      promises.push(promise);
    });
    const data = await Promise.all(promises);
    return this.replace(regex, () => data.shift());
  }

  STR.transform = function (regex, src, defkey, ukn, filter) {
    return new Promise((R0, RJ0) => {
      //async(function () {
      if ((typeof src !== "object") && (typeof src !== "string")) return;

      const bR = ((x) => { return x });
      filter = (typeof filter === "function") ? filter : bR;
      defkey = isFinite(defkey) && (defkey != null) ? defkey : 0;

      /* CHECK Hierarchical ITENS */
      const chcl = (X, V) => {
        const aR = Array.isArray(X);
        const oB = (typeof X === 'object');

        return (
          (!oB && !aR) ||
          (aR && (!isFinite(V) || X.length <= V)) ||
          (!aR && !X.hasOwnProperty(V))
        );
      }

      let n = (this + "");

      /* LIMIT LOOP */
      const m = 1000;
      var c = 0;

      ((checker, process) => {
        /* WHILE REGEX MATCH */
        (function recheck(l) {
          checker(process, (r, terminate) => {
            n = r;
            if (terminate === true) {
              return R0(n);
            }

            recheck(1);
          });
        })();

        /* CHECK MATCH */
      })((process, clbackCheck) => {
        return (n.match(regex) && (c < m))
          ? n.replaceAsync(regex, async (m, ctt, oset, input_string) => {
            if ((++c) > m) {
              ER('Over processing.');
              return clbackCheck(n);
            }

            return await process(m, ctt, oset, input_string);
          }).then((r) => { clbackCheck(r, false) })
          : clbackCheck(n, true);
      },
        /* PROCESS */
        (m, ctt, oset, input_string) => {
          return new Promise((R1, RJ1) => {
            /* MAKE IS A REPLACEMENT VALUE
             * LOGIC IS A PLUGABLE PROCESSING LOGIC
             */
            ((make, logic) => {
              /* MAKE CONTAIN ONLY VALID KEY CHARACTERS */
              ((oset.match(/[^\w\d\.]/i)) ? logic : make)(src, oset, (t) => {
                R1(filter(t, m, ctt, oset, input_string));
              });

            })(
              /* make */
              /* Hierarchical src */
              (X, K, clbackH) => {
                const fX = X;
                const fK = K;
                K = K.split('.');

                /* RETURN PROCESS */
                const prc = (O, o) => {
                  return (typeof O === "function")
                    ? O(fK, o)
                    : (
                      ((typeof O === "string") || (isFinite(O)))
                        ? O
                        : (
                          (Array.isArray(O) && O.length > defkey)
                            ? O[defkey]
                            : (
                              (typeof ukn === 'function'
                                ? ukn(fK, o)
                                : fK
                              )
                            )
                        )
                    )
                };

                /* FOREACH Hierarchical KEYS */
                for (let i = 0; i < K.length; i++) {
                  if (chcl(X, K[i])) {
                    WN("Not parse item [" + K.join("][") + "] in '" + n + "'");
                    clbackH(prc(fX, K[i]));
                  }

                  X = X[(Array.isArray(X) ? parseInt : bR)(K[i])];
                }

                /* Non Hierarchical src */
                clbackH(prc(X, K[(K.length - 1)]));
              },
              /*
               * LOGIC CONTENT
               */
              (X, K, clbackLogic) => {
                var mt = K.match(/(?<var>[^\?\|]+)\?(?<true>[^\?\|]*)(\|(?<false>[^\?\|]*))?/i);

                ("${" + mt.groups.var.trim() + "}").transform(regex, src, defkey, ukn, filter).then((z) => {
                  z = z.trim().toLowerCase();

                  if ((z == "true") || (isFinite(z) && (parseFloat(z) > 0))) {
                    return clbackLogic(mt.groups.true ? mt.groups.true : '');
                  } else if ((z == "false") || (isFinite(z) && (parseFloat(z) == 0))) {
                    return clbackLogic(mt.groups.false ? mt.groups.false : '');
                  }

                  clbackLogic(z);
                });
              }
            );
          });
        }
      );
    });
    //})();
  };

  STR.parseText = function (items, ukn) {
    return (this + "").transform(/(\$|\{)\{((?:[^\{\}\$\\]|\\.)*)\}\}?/gi, items, null, ukn);
  };

  STR.parseI18n = async function (items, ukn) {
    return this.transform(/(?<ki>^|[^\$])\{(?<id>[^\{\}\$\s]+)\}/g, items, null, ukn, (r, ctt, oset, input_string) => {
      return ctt[0] + r;
    });
  };

  STR.i18n = function () {
    return this.parseI18n(w.i18n());
  };

})(String.prototype, log, warn, error);