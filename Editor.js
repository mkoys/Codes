// Editor class contains current content and it is able to modify it
export default class Editor {
    constructor() {
        this.content = []; // All current content split by lines
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
        // If line is 0 or lower return
        if(line <= 0) {return}
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
}