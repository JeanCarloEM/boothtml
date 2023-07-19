interface bootCFG {
  paths: {
    root: String,
    customcfg?: String,
    customroot?: String,
    morecfg?: String,
    moreroot?: String
  }
}

declare global {
  interface Window {
    bootdata: bootCFG;
    bootworker: Worker;
    transformeAndCacheWorker: ServiceWorkerRegistration,
    tel:324579
  }
}

const LOG = console.log;
const WARN = console.warn;
const ERROR = console.error;
const w = window;
const $ = document.querySelectorAll;

/*
 *
 */
export abstract class bootHTML {
  static readonly bootWorkerFile = "bootworker";
  static readonly bootSWorkerFile = "bootworker";

  public static start() {
    this.parse_SEO();
    this.bootworker_start();
  };

  private static baseMessageWorker(worker: any, title: String, more: CallableFunction) {
    worker.addEventListener('message', function (e: any) {
      if (e.hasOwnProperty("data") && e.data.hasOwnProperty("cmd") && (["log", "warn", "error"].indexOf(e.data.cmd.trim().toLowerCase()) >= 0)) {
        let n = e.data.cmd.trim().toLowerCase();
        return ((n === 'log')
          ? LOG
          : (
            (n === "warn")
              ? WARN
              : (
                (n === "error")
                  ? ERROR
                  : () => {
                    return more(e);
                  }
              )
          ))(title + ": " + e.data.msg, e.data.more ? e.data.more : null)
      }

      return more(e);
    });
  };

  private static readScriptData() {
    LOG("Getting root boot path...");

    ((readS: Function) => {
      w.bootdata = <bootCFG>{
        paths: {
          root: readS('src', true),
          customcfg: readS('data-customcfg'),
          customroot: readS('data-customcfg', true),
          morecfg: readS('data-morecfg'),
          moreroot: readS('data-morecfg', true)
        }
      };
    })((attr: string, folder: Boolean = false): string => {
      try {
        let x = $("script[data-customcfg]")[0].getAttribute(attr) + "";
        x = (folder ? x.replace(/\/[^\/]+$/, "") : x).trim();
        return (x.length == 0) ? x : (x.match(/^\s*(http|ftp)s?\:\/\//i) ? x : x = w.location.protocol + "//" + w.location.host + "/" + x.replace(/^\s*\//i, '').replace(/\/s*$/i, ''));
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

  private static async parseworker_start(url: string) {
    LOG("Registering ParseWorker from url '" + url + "'.");

    navigator.serviceWorker.register(url)
      .then((PU) => {
        w.transformeAndCacheWorker = PU;

        this.baseMessageWorker(PU, "ParserWorker", (e: Event) => {

        });

        LOG("ParseWorker registered from '" + url + "'.");
      }).catch((e) => {
        ERROR(e);
      });
  };

  private static async bootworker_start() {
    this.readScriptData();

    LOG("Initializing BootWorker from url '" + w.bootdata.paths.root + "/" + this.bootWorkerFile + ".js'.");
    var parser_service = false;

    ((BW) => {
      w.bootworker = BW;
      this.baseMessageWorker(BW, "BootWorker", (e: any) => {
        ((dt) => {
          switch (dt.cmd.trim().toLowerCase()) {
            case "load_parserURLworker".toLowerCase():
              if (parser_service) {
                return;
              }

              LOG('Getting parserURL.worker for boot.');
              parser_service = true;
              this.parseworker_start(w.bootdata.paths.root + "/parseURL.worker.js");

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
    })(new Worker(w.bootdata.paths.root + "/" + this.bootWorkerFile + ".js"));
  };

  private static async parse_SEO() {
    LOG("Preparing the SEO analyzer...");
  };
}