import { textBasicParser } from "./textBasicParser";
String.prototype.tranform = function (regex, src, defkey, ukn, filterValue) {
    return (new textParserCore(this + "", src, defkey, ukn, filterValue)).run();
};
class textParserCore extends textBasicParser {
    constructor(str, src, defkey, ukn, filter) {
        super(str, /(?<open>(?!\\\w[\w\d\-_\.]*)\$?\{{1,3})(?<content>(?:[^\{\}\$\\]|\\.)*)(?<close>\}{1,3})/gi, filter);
        this.str = str;
        this.src = src;
        this.defkey = defkey;
        this.ukn = ukn;
        this.filter = filter;
    }
    processMatch(match) {
        return new Promise((R0, R_0) => {
        });
    }
}
//# sourceMappingURL=textParserCore.js.map