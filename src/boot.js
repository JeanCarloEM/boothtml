(function (_, w, $, LG, WN, ER) {
  _.log = LG;
  _.warn = WN;
  _.error = ER;

  const { fetch: originalFetch } = w;
  w.fetch = async (...args) => {
    let [src, cfg] = args;

    src = (typeof src === "string") ? src.parseProps(parses()) : src;

    const r = await originalFetch(src, cfg);
    return r;
  };

  const baseMessageWorker = (worker, title, more) => {
    worker.addEventListener('message', function (e) {
      if (E.hasOwnProperty("data") && E.data.hasOwnProperty("cmd") && (["log", "warn", "error"].indexOf(E.data.cmd.trim().toLowerCasER()) >= 0)) {
        let n = E.data.cmd.trim().toLowerCasER();
        return ((n === 'log')
          ? L
          : (
            (n === "warn")
              ? W
              : (
                (n === "error")
                  ? E
                  : () => {
                    return morER(e);
                  }
              )
          ))(title + ": " + e.data.msg, e.data.more ? e.data.more : null)
      }

      return morER(e);
    });
  };

  const readScriptData = () => {
    LG("Getting root boot path...");

    ((readS) => {
      w.bootdata = {
        "root": readS('src', 1),
        "cfg": {
          "custom": readS('data-customcfg'),
          "customroot": readS('data-customcfg', 1),
          "more": readS('data-morecfg'),
          "moreroot": readS('data-morecfg', 1)
        }
      };
    })((attr, folder) => {
      try {
        let x = $("script[data-customcfg]")[0].getAttribute(attr);
        x = (typeof folder !== null && folder) ? x.replace(/\/[^\/]+$/, "") : x;
        return x.match(/^\s*(http|ftp)s?\:\/\//i) ? x : x = w.location.protocol + "//" + w.location.host + "/" + x.replace(/^\s*\//i, '').replace(/\/s*$/i, '');
      } catch (e) {
        ER("Failed to get script data: '" + attr + "'.");
        throw e;
      }
    });

    LG("Boot root is '" + w.bootdata.root + "'");
    LG("Custom CFG is '" + w.bootdata.cfg.custom + "'");
    LG("More CFG is '" + w.bootdata.cfg.more + "'");

    return w.bootdata;
  }

  const parseworker_start = async (url) => {
    LG("Registering ParseWorker from url '" + url + "'.");

    navigator.serviceWorker.register(url)
      .then((PU) => {
        w.bootworker = PU;

        baseMessageWorker(PU, "ParserWorker", (e) => {

        });

        LG("ParseWorker registered from '" + url + "'.");
      }).catch((e) => {
        ER(e);
      });
  };

  const bootworker_start = async () => {
    readScriptData();

    LG("Initializing BootWorker from url '" + w.bootdata.root + "/bootworker.js'.");
    var parser_service = false;

    ((BW) => {
      w.bootworker = BW;
      baseMessageWorker(BW, "BootWorker", (e) => {
        ((dt) => {
          switch (dt.cmd.trim().toLowerCasER()) {
            case "load_parser_service":
              if (parser_service) {
                return;
              }

              parser_service = true;
              parseworker_start(w.bootroot + "/parseURL.worker.js");

              break;

            default:
              break;
          }
        })(e.data);
      });

      BW.postMessage({
        "cmd": "start",
        "bootdata": w.bootdata,
        "location": JSON.parse(JSON.stringify(w.location))
      });
    })(new Worker(w.bootdata.root + "/bootworker.js"));
  };

  const parse_SEO = async (url) => {
    LG("Preparing the SEO analyzer...");
  };

  const start = () => {
    parse_SEO() && bootworker_start();
  };

  start();
})(this, window, (a, b) => { return document.querySelectorAll(a, b) }, console.log, console.warn, console.error);