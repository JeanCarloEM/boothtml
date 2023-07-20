export {};
type TSSource = Object;
type TstringTransform = (regex: RegExp, src: TSSource, defkey: string, ukn: TSReplacer, filterValue: TSReplacerFilter) => Promise<string>;
type TSPromiseMatch = (match: string, ...args: any[]) => Promise<string>;
type TSReplaceAsync = (searchValue: string | RegExp, replacer: string | TSPromiseMatch) => Promise<string>;
type TSReplacer = (match: RegExpMatchArray) => Promise<string>;
type TSReplacerFilter = (value: string, match: RegExpMatchArray) => Promise<string>;
type TSReplaceAllAsync = (searchValue: RegExp, replacer: TSReplacer) => Promise<string>;
declare global {
    export interface String {
        tranforme: TstringTransform;
        replaceAsync: TSReplaceAsync;
        replaceAllAsync: TSReplaceAllAsync;
    }
}
export declare enum PromiseExecutionMode {
    All = 0,
    ForEach = 1
}
