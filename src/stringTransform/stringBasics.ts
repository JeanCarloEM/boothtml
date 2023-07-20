import { PromiseExecutionMode, TSPromiseMatch } from "./definitions";


export abstract class stringBasics {
  public static replaceAsync = async (
    input: string, regex: string | RegExp,
    replacer: string | TSPromiseMatch
  ): Promise<string> => {
    const promises: (string | Promise<string>)[] = [];
    input.replace(regex, function (match: string, ...args: any[]): any {
      promises.push((typeof replacer === 'function') ? replacer(match, ...args) : replacer);
    });
    const data = await Promise.all(promises);
    return input.replace(regex, r => <string>data.shift());
  }

  /*
   * https://keestalkstech.com/2023/04/building-a-replace-all-async-in-typescript/
   */
  public static replaceAllAsync = async (
    input: string,
    regex: RegExp,
    replacement: (match: RegExpMatchArray) => Promise<string>,
    mode: PromiseExecutionMode = PromiseExecutionMode.All
  ): Promise<string> => {
    // replace all implies global, so append if it is missing
    const addGlobal = !regex.flags.includes("g")
    let flags = regex.flags
    if (addGlobal) flags += "g"

    // get matches
    let matcher = new RegExp(regex.source, flags)
    const matches = Array.from(input.matchAll(matcher))

    if (matches.length == 0) return input

    // construct all replacements
    let replacements: Array<string> = [];

    if (mode == PromiseExecutionMode.All) {
      replacements = await Promise.all(matches.map(match => replacement(match)))
    } else if (mode == PromiseExecutionMode.ForEach) {
      replacements = new Array<string>()
      for (let m of matches) {
        let r = await replacement(m)
        replacements.push(r)
      }
    }

    // change capturing groups into non-capturing groups for split
    // (because capturing groups are added to the parts array
    let source = regex.source.replace(/(?<!\\)\((?!\?:)/g, "(?:")
    let splitter = new RegExp(source, flags)

    const parts = input.split(splitter)

    // stitch everything back together
    let result = parts[0]
    for (let i = 0; i < replacements.length; i++) {
      result += replacements[i] + parts[i + 1]
    }

    return result
  }
}