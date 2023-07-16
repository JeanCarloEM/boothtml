(function (_, w, $, L, W, E) {
  _.log = L;
  _.warn = W;
  _.error = E;

  const { fetch: originalFetch } = w;
  w.fetch = async (...args) => {
    let [src, cfg] = args;

    src = (typeof src === "string") ? src.parseProps(parses()) : src;

    const r = await originalFetch(src, cfg);
    return r;
  };

  const baseMessageWorker = (worker, title, more) => {
    worker.addEventListener('message', function (e) {
      if (E.hasOwnProperty("data") && E.data.hasOwnProperty("cmd") && (["log", "warn", "error"].indexOf(E.data.cmd.trim().toLowerCase()) >= 0)) {
        let n = E.data.cmd.trim().toLowerCase();
        return ((n === 'log')
          ? L
          : (
            (n === "warn")
              ? W
              : (
                (n === "error")
                  ? E
                  : () => {
                    return more(e);
                  }
              )
          ))(title + ": " + e.data.msg, e.data.more ? e.data.more : null)
      }

      return more(e);
    });
  };

  const bootworker_start = (url) => {
    L("Initializing BootWorker from url '" + url + "'.");
    var parser_service = false;

    ((BW) => {
      w.bootworker = BW;
      baseMessageWorker(BW, "BootWorker", (e) => {
        ((dt) => {
          switch (dt.cmd.trim().toLowerCase()) {
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

      BW.postMessage({ "cmd": "start", "bootroot": w.bootroot, "boot_customcfg": w.boot_customcfg, "location": JSON.parse(JSON.stringify(w.location)) });
    })(new Worker(url));
  };

  const parseworker_start = (url) => {
    L("Registering ParseWorker from url '" + url + "'.");

    navigator.serviceWorker.register(url)
      .then((PU) => {
        w.bootworker = PU;

        baseMessageWorker(PU, "ParserWorker", (e) => {

        });

        L("ParseWorker registered from '" + url + "'.");
      }).catch((e) => {
        E(e);
      });
  };

  const start = () => {
    L("Getting root boot path...")

    try {
      w.bootroot = (() => {
        let url = $("script[data-customcfg]")[0].getAttribute("src").replace(/\/boot(\.min)?\.js.*/gi, "");
        if (!url.match(/^\s*(http|ftp)s?\:\/\//i)) {
          url = w.location.protocol + "//" + w.location.host + "/" + url.replace(/^\s*\//i, '').replace(/\/s*$/i, '');
        }

        return url;
      })();

      w.boot_customcfg = (() => {
        let url = $("script[data-customcfg]")[0].getAttribute("data-customcfg");
        if (!url.match(/^\s*(http|ftp)s?\:\/\//i)) {
          url = w.location.protocol + "//" + w.location.host + "/" + url.replace(/^\s*\//i, '').replace(/\/s*$/i, '');
        }

        return url;
      })();
    } catch (e) {
      throw "Failed to get bootworker url.";
    }

    L("Boot root is '" + w.bootroot + "'");
    L("Custom CFG is '" + w.boot_customcfg + "'");
    bootworker_start(w.bootroot + "/bootworker.js");
  };

  start();
})(this, window, (a, b) => { return document.querySelectorAll(a, b) }, console.log, console.warn, console.error);