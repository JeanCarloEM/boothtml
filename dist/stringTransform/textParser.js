import { textBasicParser } from "./textBasicParser";
String.prototype.tranform = function (regex, src, defkey, ukn, filterValue) {
    return (new textParser(this + "", src, defkey, ukn, filterValue)).run();
};
class textParser extends textBasicParser {
    constructor(str, src, defkey, ukn, filter) {
        super(str, /(\$|\{)\{((?:[^\{\}\$\\]|\\.)*)\}\}?/gi, filter);
        this.str = str;
        this.src = src;
        this.defkey = defkey;
        this.ukn = ukn;
        this.filter = filter;
    }
    processMatch(match) {
        return new Promise((R0, R_0) => {
            R0('a');
        });
    }
}
//# sourceMappingURL=textParser.js.map