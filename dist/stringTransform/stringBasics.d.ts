import { PromiseExecutionMode, TSPromiseMatch } from "./definitions";
export declare abstract class stringBasics {
    static replaceAsync: (input: string, regex: string | RegExp, replacer: string | TSPromiseMatch) => Promise<string>;
    static replaceAllAsync: (input: string, regex: RegExp, replacement: (match: RegExpMatchArray) => Promise<string>, mode?: PromiseExecutionMode) => Promise<string>;
}
