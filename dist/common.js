(function (_, w) {
  _.uid = () => {
    return "ixxxxxxxxxxxx4xxyxxxxxxxxxxxxxxx"
      .replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .substr(0, 10);
  };
})(
  typeof self !== "undefined" ? self : this,
  typeof window !== "undefined" ? window : self,
);
