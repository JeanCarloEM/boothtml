
import { TSReplacer, TSReplacerFilter, TSSource } from "./definitions";
import { stringBasics } from "./stringBasics";
import { textBasicParser } from "./textBasicParser";


/*
 *
 */
String.prototype.tranform = function (
  regex: RegExp,
  src: TSSource,
  defkey: string,
  ukn: TSReplacer,
  filterValue: TSReplacerFilter
): Promise<string> {
  return (new textParserCore(this + "", src, defkey, ukn, filterValue)).run();
}


/*
 *
 */

class textParserCore extends textBasicParser {
  constructor(
    protected str: string,
    private readonly src?: TSSource,
    private readonly defkey?: string,
    private readonly ukn?: TSReplacer,
    protected readonly filter?: TSReplacerFilter
  ) {
    super(str, /(?<open>(?!\\\w[\w\d\-_\.]*)\$?\{{1,3})(?<content>(?:[^\{\}\$\\]|\\.)*)(?<close>\}{1,3})/gi, filter);
  }

  protected processMatch(match: RegExpMatchArray): Promise<string> {
    return new Promise<string>((R0, R_0) => {

    });
  }
}