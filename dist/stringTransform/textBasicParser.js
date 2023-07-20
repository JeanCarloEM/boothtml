var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { stringBasics } from "./stringBasics";
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
export class textBasicParser extends stringBasics {
    constructor(str, regex, filter) {
        super();
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
//# sourceMappingURL=textBasicParser.js.map