var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
export var PromiseExecutionMode;
(function (PromiseExecutionMode) {
    PromiseExecutionMode[PromiseExecutionMode["All"] = 0] = "All";
    PromiseExecutionMode[PromiseExecutionMode["ForEach"] = 1] = "ForEach";
})(PromiseExecutionMode || (PromiseExecutionMode = {}));
String.prototype.replaceAllAsync = function (searchValue, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        return textBasicParser.replaceAllAsync("" + this, searchValue, replacer);
    });
};
String.prototype.replaceAsync = function (searchValue, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        return textBasicParser.replaceAsync("" + this, searchValue, replacer);
    });
};
class textBasicParser {
    constructor(str, regex, filter) {
        this.str = str;
        this.regex = regex;
        this.filter = filter;
        this.limiteRunLoop_counter = 0;
        this.limiteRunLoop = 1000;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recursiveTransform();
        });
    }
    recursiveTransform(str = this.str) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((R0, R_0) => {
                if (!str.match(this.regex)) {
                    return R0(this.str);
                }
                if (++this.limiteRunLoop_counter > this.limiteRunLoop) {
                    return R_0('Over processing.');
                }
                str.replaceAllAsync(this.regex, this.transform);
            });
        });
    }
    transform(match) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((R1, R_1) => {
                this.processMatch(match)
                    .then((r) => {
                    ((re_reunRT) => {
                        if (this.filter) {
                            return this.filter(r, match)
                                .then(r3 => re_reunRT(r3));
                        }
                        re_reunRT(r);
                    })((rr) => {
                        this.recursiveTransform(rr)
                            .then(rr_ => R1(rr_));
                    });
                })
                    .catch(r => R_1(r));
            });
        });
    }
}
_a = textBasicParser;
textBasicParser.replaceAsync = (input, regex, replacer) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [];
    input.replace(regex, function (match, ...args) {
        promises.push((typeof replacer === 'function') ? replacer(match, ...args) : replacer);
    });
    const data = yield Promise.all(promises);
    return input.replace(regex, r => data.shift());
});
textBasicParser.replaceAllAsync = (input, regex, replacement, mode = PromiseExecutionMode.All) => __awaiter(void 0, void 0, void 0, function* () {
    const addGlobal = !regex.flags.includes("g");
    let flags = regex.flags;
    if (addGlobal)
        flags += "g";
    let matcher = new RegExp(regex.source, flags);
    const matches = Array.from(input.matchAll(matcher));
    if (matches.length == 0)
        return input;
    let replacements = [];
    if (mode == PromiseExecutionMode.All) {
        replacements = yield Promise.all(matches.map(match => replacement(match)));
    }
    else if (mode == PromiseExecutionMode.ForEach) {
        replacements = new Array();
        for (let m of matches) {
            let r = yield replacement(m);
            replacements.push(r);
        }
    }
    let source = regex.source.replace(/(?<!\\)\((?!\?:)/g, "(?:");
    let splitter = new RegExp(source, flags);
    const parts = input.split(splitter);
    let result = parts[0];
    for (let i = 0; i < replacements.length; i++) {
        result += replacements[i] + parts[i + 1];
    }
    return result;
});
//# sourceMappingURL=stringTransform.js.map