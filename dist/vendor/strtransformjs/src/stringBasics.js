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
import { PromiseExecutionMode } from "./definitions";
export class stringBasics {
}
_a = stringBasics;
stringBasics.replaceAsync = (input, regex, replacer) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [];
    input.replace(regex, function (match, ...args) {
        promises.push((typeof replacer === 'function') ? replacer(match, ...args) : replacer);
    });
    const data = yield Promise.all(promises);
    return input.replace(regex, r => data.shift());
});
stringBasics.replaceAllAsync = (input, regex, replacement, mode = PromiseExecutionMode.All) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=stringBasics.js.map