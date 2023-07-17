(function (_) {
  ((LG, WN, ER) => {
    _.addEventListener('install', function (e) {
      W("Installing worker...");

      _.addEventListener('message', function (e) {
      });

      _.addEventListener('fetch', function (e) {
        W('Fetching "' + e.request + '"');
      });
    });

    L('teste');
  })((msg) => {
    _.postMessage({ "cmd": "log", "msg": msg });
  },
    (msg) => {
      _.postMessage({ "cmd": "warn", "msg": msg });
    },
    (msg) => {
      _.postMessage({ "cmd": "error", "msg": msg });
    });
})(self);