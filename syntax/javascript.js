export default {
    default: /(?<let>\blet\b)|(?<const>\bconst\b)|(?<operator>\-\=|\+\=|\-|\+|\\|\/|\%)|(?<signs>\=|\,)|(?<number>\b[0-9]+\b)|(?<func>\bfunction\b\s+\w+(\s+|)\(.*\))|(?<function>\bfunction\b)/gm,
    func: /(?<function>\bfunction\b)|(?<params>\(.*\))|(?<functionName>\w)/gm,
    params: /(?<bracket>\(|\))|(?<default>.*)/gm
}