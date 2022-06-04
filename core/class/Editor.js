// Editor class contains current content and it is able to modify it
export default class Editor {
    constructor() {
        this.content = []; // All current content split by lines
    }

    // Finds first character that matches from line
    findChar(line, char, charge) {
        // Storage with default -1 for index of matched character
        let match = -1;
        // Check if line exist's
        if (!this.lineLength(line)) { return }
        // Split line into character array
        let lineArr = this.content[line].split("");
        // Set non matched to index of set character
        match = lineArr.findIndex(item => charge ? item === char : item !== char);
        // Return matched index
        return match;
    }

    // Return length of selected line
    lineLength(line) {
        // If content exist return it's length else return 0
        return this.content[line] ? this.content[line].length : 0;
    }

    // Adds content at choosen line and column
    addContent(line, column, content) {
        // Store selected line content if empty set to string
        const lineContent = this.content[line] ? this.content[line] : "";
        /* Set choosen line with slice of line content from start 
        to column add content and then add line content slice from 
        column till end */
        this.content[line] = lineContent.slice(0, column) + content + lineContent.slice(column);
    }

    removeLine(line) {
        // Store selected line content if empty set to string
        const lineContent = this.content[line] ? this.content[line] : "";
        // Deletes line from content with set index 
        this.content.splice(line, 1);
        // Append line content to previous line
        this.content[line - 1] += lineContent;
    }

    removeContent(line, column, deleteCount) {
        // Store selected line content if empty set to string
        const lineContent = this.content[line] ? this.content[line] : "";
        /* Set choosen line with slice of line content from start 
        to column plus delete count add line content slice from 
        column till end */
        this.content[line] = lineContent.slice(0, column - deleteCount) + lineContent.slice(column);
    }

    appendLine(line, column) {
        // Store after content from column. If empty set to string
        const afterContent = this.content[line] ? this.content[line].slice(column) : "";
        // Store before content from 0 to column. If empty set to string
        const beforeContent = this.content[line] ? this.content[line].slice(0, column) : "";
        // Set current line with before content
        this.content[line] = beforeContent;
        // Add line at line index + 1 and add left content to it
        this.content.splice(line + 1, 0, afterContent);
    }
}