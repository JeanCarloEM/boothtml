declare global {
  interface window {
    bootdata: object;
    bootworker: Worker;
  }
}

const LOG = console.log;
const WARN = console.warn;
const ERROR = console.error;
const w = window;
const $ = (x: string) => { return document.querySelectorAll(x); }
const bootWorkerFile = "bootworker";
const bootSWorkerFile = "bootworker";

export class bootHTML {
  private baseMessageWorker(worker: any, title: String, more: CallableFunction) {
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

  private readScriptData() {
    LOG("Getting root boot path...");

    ((readS) => {
      (<any>w).bootdata = {
        "root": readS('src', true),
        "cfg": {
          "custom": readS('data-customcfg'),
          "customroot": readS('data-customcfg', true),
          "more": readS('data-morecfg'),
          "moreroot": readS('data-morecfg', true)
        }
      };
    })((attr: any, folder: Boolean = false) => {
      try {
        let x = $("script[data-customcfg]")[0].getAttribute(attr) + "";
        x = (folder ? x.replace(/\/[^\/]+$/, "") : x).trim();
        return (x.length == 0) ? x : (x.match(/^\s*(http|ftp)s?\:\/\//i) ? x : x = w.location.protocol + "//" + w.location.host + "/" + x.replace(/^\s*\//i, '').replace(/\/s*$/i, ''));
      } catch (e) {
        ERROR("Failed to get script data: '" + attr + "'.");
        throw e;
      }
    });

    LOG("Boot root is '" + (<any>w).bootdata.root + "'");
    LOG("Custom CFG is '" + (<any>w).bootdata.cfg.custom + "'");
    LOG("More CFG is '" + (<any>w).bootdata.cfg.more + "'");

    return (<any>w).bootdata;
  }

  private async parseworker_start(url: string) {
    LOG("Registering ParseWorker from url '" + url + "'.");

    navigator.serviceWorker.register(url)
      .then((PU) => {
        (<any>w).bootworker = PU;

        this.baseMessageWorker(PU, "ParserWorker", (e: Event) => {

        });

        LOG("ParseWorker registered from '" + url + "'.");
      }).catch((e) => {
        ERROR(e);
      });
  };

  private async bootworker_start() {
    this.readScriptData();

    LOG("Initializing BootWorker from url '" + (<any>w).bootdata.root + "/" + bootWorkerFile + ".js'.");
    var parser_service = false;

    ((BW) => {
      (<any>w).bootworker = BW;
      this.baseMessageWorker(BW, "BootWorker", (e: any) => {
        ((dt) => {
          switch (dt.cmd.trim().toLowerCase()) {
            case "load_parserURLworker".toLowerCase():
              if (parser_service) {
                return;
              }

              LOG('Getting parserURL.worker for boot.');
              parser_service = true;
              this.parseworker_start((<any>w).bootdata.root + "/parseURL.worker.js");

              break;

            default:
              break;
          }
        })(e.data);
      });

      BW.postMessage({
        "cmd": "start",
        "bootdata": (<any>w).bootdata,
        "location": JSON.parse(JSON.stringify(w.location))
      });
    })(new Worker((<any>w).bootdata.root + "/" + bootWorkerFile + ".js"));
  };

  private async parse_SEO() {
    LOG("Preparing the SEO analyzer...");
  };

  constructor() {
    this.parse_SEO();
    this.bootworker_start();
  };
}