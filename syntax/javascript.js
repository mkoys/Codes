export default {
    default: /(?<let>\blet\b)|(?<const>\bconst\b)|(?<comment>\/\/.*)|(?<special>\;|\=\>)|(?<signs>\=|\,)|(?<operator>\>|\<|\-\=|\+\=|\-|\+|\\|\/|\%|\&\&|\&|\|\||\|)|(?<number>\b[0-9]+\b)|(?<string>".*?")|(?<func>(\bfunction\b|\s+|)\w+(\s+|)\(.*\))|(?<keyword>(\bfunction\b|\bimport\b|\bfrom\b|\breturn\b|\bif\b))/gm,
    func: /(?<function>\bfunction\b)|(?<params>\(.*\))|(?<functionName>\w)/gm,
    params: /(?<bracket>\(|\))|(?<default>[^\)|\(]+)/gm
}