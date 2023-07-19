interface bootCFG {
  paths: {
    root: String;
    customcfg?: String;
    customroot?: String;
    morecfg?: String;
    moreroot?: String;
  };
}
declare global {
  interface Window {
    bootdata: bootCFG;
    bootworker: Worker;
    transformeAndCacheWorker: ServiceWorkerRegistration;
    tel: 324579;
  }
}
export declare abstract class bootHTML {
  static readonly bootWorkerFile = "bootworker";
  static readonly bootSWorkerFile = "bootworker";
  static start(): void;
  private static baseMessageWorker;
  private static readScriptData;
  private static parseworker_start;
  private static bootworker_start;
  private static parse_SEO;
}
export {};
