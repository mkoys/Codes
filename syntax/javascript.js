export default {
    default:/(?<string>".*?")|(?<comment>\/\/.*)|(?<bracket>\(|\)|\{|\}|\[|\])|(?<variable>\bconst\b|\blet\b|\bvar\b)|(?<operator>\=\>|\!\=|\!\=\=|\=\=\=|\=\=|\!\=\=|\!\=|\<\=|\>\=|\+\+|\-\-|\+\=|\-\=|\=|\+|\-|\>|\<)|(?<special>\breturn\b|\bfunction\b|\bfor\b|\bwhile\b|\bdo\b|\bforEach\b|\bclass\b|\bconstructor\b|\bimport\b|\bexport\b|\bfrom\b|\bdefault\b|\bif\b|\belse\b)/gm,
}