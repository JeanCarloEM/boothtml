import { TSReplacer, TSPromiseMatch, TSReplacerFilter, TSSource } from "./definitions";
import { stringBasics } from "./stringBasics";

/*
 *
 */
String.prototype.replaceAllAsync = async function (
  searchValue: RegExp,
  replacer: TSReplacer
): Promise<string> {
  return textBasicParser.replaceAllAsync("" + this, searchValue, replacer);
}


/*
 *
 */
String.prototype.replaceAsync = async function (
  searchValue: string | RegExp,
  replacer: string | TSPromiseMatch
): Promise<string> {
  return textBasicParser.replaceAsync("" + this, searchValue, replacer);
}

/*
 *
 */
export abstract class textBasicParser extends stringBasics {
  private limiteRunLoop_counter: number = 0;
  public readonly limiteRunLoop: number = 1000;

  constructor(
    protected str: string,
    public readonly regex: RegExp,
    protected readonly filter?: TSReplacerFilter
  ) {
    super();
  }

  public async run(): Promise<string> {
    return this.recursiveTransform();
  }

  protected abstract processMatch(match: RegExpMatchArray): Promise<string>;

  private async recursiveTransform(str: string = this.str): Promise<string> {
    return new Promise<string>((R0, R_0) => {
      if (!str.match(this.regex)) {
        return R0(this.str);
      }

      if (++this.limiteRunLoop_counter > this.limiteRunLoop) {
        return R_0('Over processing.');
      }

      str.replaceAllAsync(
        this.regex,
        this.transform
      );
    });
  }

  private async transform(match: RegExpMatchArray): Promise<string> {
    return new Promise<string>((R1, R_1) => {
      this.processMatch(match)
        .then((r) => {
          ((re_reunRT) => {
            if (this.filter) {
              return this.filter(r, match)
                .then(r3 => re_reunRT(r3));
            }

            re_reunRT(r);
          })((rr: string) => {/* re_reunRT */
            this.recursiveTransform(rr)
              .then(rr_ => R1(rr_));
          });
        })
        .catch(r => R_1(r));
    });
  }
}