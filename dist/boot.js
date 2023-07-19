var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const LOG = console.log;
const WARN = console.warn;
const ERROR = console.error;
const w = window;
const $ = document.querySelectorAll;
export class bootHTML {
  static start() {
    this.parse_SEO();
    this.bootworker_start();
  }
  static baseMessageWorker(worker, title, more) {
    worker.addEventListener("message", function (e) {
      if (
        e.hasOwnProperty("data") &&
        e.data.hasOwnProperty("cmd") &&
        ["log", "warn", "error"].indexOf(e.data.cmd.trim().toLowerCase()) >= 0
      ) {
        let n = e.data.cmd.trim().toLowerCase();
        return (
          n === "log"
            ? LOG
            : n === "warn"
            ? WARN
            : n === "error"
            ? ERROR
            : () => {
                return more(e);
              }
        )(title + ": " + e.data.msg, e.data.more ? e.data.more : null);
      }
      return more(e);
    });
  }
  static readScriptData() {
    LOG("Getting root boot path...");
    ((readS) => {
      w.bootdata = {
        paths: {
          root: readS("src", true),
          customcfg: readS("data-customcfg"),
          customroot: readS("data-customcfg", true),
          morecfg: readS("data-morecfg"),
          moreroot: readS("data-morecfg", true),
        },
      };
    })((attr, folder = false) => {
      try {
        let x = $("script[data-customcfg]")[0].getAttribute(attr) + "";
        x = (folder ? x.replace(/\/[^\/]+$/, "") : x).trim();
        return x.length == 0
          ? x
          : x.match(/^\s*(http|ftp)s?\:\/\//i)
          ? x
          : (x =
              w.location.protocol +
              "//" +
              w.location.host +
              "/" +
              x.replace(/^\s*\//i, "").replace(/\/s*$/i, ""));
      } catch (e) {
        ERROR("Failed to get script data: '" + attr + "'.");
        throw e;
      }
    });
    LOG("Boot root is '" + w.bootdata.paths.root + "'");
    LOG("Custom CFG is '" + w.bootdata.paths.customcfg + "'");
    LOG("More CFG is '" + w.bootdata.paths.morecfg + "'");
    return w.bootdata;
  }
  static parseworker_start(url) {
    return __awaiter(this, void 0, void 0, function* () {
      LOG("Registering ParseWorker from url '" + url + "'.");
      navigator.serviceWorker
        .register(url)
        .then((PU) => {
          w.transformeAndCacheWorker = PU;
          this.baseMessageWorker(PU, "ParserWorker", (e) => {});
          LOG("ParseWorker registered from '" + url + "'.");
        })
        .catch((e) => {
          ERROR(e);
        });
    });
  }
  static bootworker_start() {
    return __awaiter(this, void 0, void 0, function* () {
      this.readScriptData();
      LOG(
        "Initializing BootWorker from url '" +
          w.bootdata.paths.root +
          "/" +
          this.bootWorkerFile +
          ".js'.",
      );
      var parser_service = false;
      ((BW) => {
        w.bootworker = BW;
        this.baseMessageWorker(BW, "BootWorker", (e) => {
          ((dt) => {
            switch (dt.cmd.trim().toLowerCase()) {
              case "load_parserURLworker".toLowerCase():
                if (parser_service) {
                  return;
                }
                LOG("Getting parserURL.worker for boot.");
                parser_service = true;
                this.parseworker_start(
                  w.bootdata.paths.root + "/parseURL.worker.js",
                );
                break;
              default:
                break;
            }
          })(e.data);
        });
        BW.postMessage({
          cmd: "start",
          bootdata: w.bootdata,
          location: JSON.parse(JSON.stringify(w.location)),
        });
      })(new Worker(w.bootdata.paths.root + "/" + this.bootWorkerFile + ".js"));
    });
  }
  static parse_SEO() {
    return __awaiter(this, void 0, void 0, function* () {
      LOG("Preparing the SEO analyzer...");
    });
  }
}
bootHTML.bootWorkerFile = "bootworker";
bootHTML.bootSWorkerFile = "bootworker";
//# sourceMappingURL=boot.js.map
