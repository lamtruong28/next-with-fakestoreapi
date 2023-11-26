/**
 *
 * @param {*} value Input string
 * @param {*} pattern Regex expression. Ex: ^[0-9]*$: only number
 * @returns string
 */
export default function regexInput(value: string, pattern: string = "") {
    let str = value;
    if (!value.match(pattern)) {
        str = value.slice(0, value.length - 1);
    }

    return str;
}
