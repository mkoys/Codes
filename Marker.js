// Handles all systax highlighting
export default class Marker {
    constructor() {
        this.content = []; // All tokenized content
    }

    mark(content, regex, scheme) {
        const matches = content.matchAll(regex); // RegExp Iterator of matches
        const [...matchesArr] = content.matchAll(regex); // Arr from RegExp match
        
        let result = []; // Final tokenized content storage
        let matchCounter = 0; // Match couter
        let index = 0;

        // No match all text set to default
        if(matchesArr.length < 1) {
            result.push({
                type: "default",
                text: content
            });
        }

        for (const match of matches) {
            // Get values from grops of match
            // Get keys from grops of match
            // Grab set string index group of match
            const groupValues = Object.values(match.groups);
            const groupKeys = Object.keys(match.groups);
            const groupIndex = groupValues.findIndex(item => typeof item === "string");
            // Match conter increment
            matchCounter++;

            // If match is further then index add text to default group till index
            if (match.index > index) {
                result.push({
                    type: "default",
                    text: content.slice(index, match.index)
                });

                // Increment index by found length
                index += match.index - index;
            }

            // Push found match by its index and length from index
            result.push({
                type: groupKeys[groupIndex],
                text: content.slice(match.index, match.index + match[0].length)
            })

            // Increment index by match length
            index += match[0].length;

            // If we are at last match item
            if(matchCounter == matchesArr.length) {
                // If current index is not at the end of content
                if(index != content.length) {
                    // Push rest of content as default string
                    result.push({
                        type: "default",
                        text: content.slice(index)
                    });
                }
            }
        }

        // Return tokenized content
        return result;
    }
}