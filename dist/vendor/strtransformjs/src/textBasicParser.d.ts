import { TSReplacerFilter } from "./definitions";
import { stringBasics } from "./stringBasics";
export declare abstract class textBasicParser extends stringBasics {
    protected str: string;
    readonly regex: RegExp;
    protected readonly filter?: TSReplacerFilter | undefined;
    private limiteRunLoop_counter;
    readonly limiteRunLoop: number;
    constructor(str: string, regex: RegExp, filter?: TSReplacerFilter | undefined);
    run(): Promise<string>;
    protected abstract processMatch(match: RegExpMatchArray): Promise<string>;
    private recursiveTransform;
    private transform;
}
