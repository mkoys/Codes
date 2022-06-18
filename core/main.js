// Import classes
import Editor from "./class/Editor.js";
import Carrot from "./class/Carrot.js";
import View from "./class/View.js";
import Marker from "./class/Marker.js";

// Scheme storage
let scheme = null;

// Create new editor
const editor = new Editor();
// Create new view with root element
const view = new View(document.querySelector("main"));
// Create new highlighter
const marker = new Marker();

// Method for setting scheme
function setScheme(newScheme) {
    scheme = newScheme;
}

// Creates new carrot and returns it
function createCarrot() {
    // Create new carrot class
    const carrot = new Carrot();
    // Create carrot on view and add it's id to class
    carrot.carrotID = view.addCarrot();
    // Return created class
    return carrot;
}

// Add content method
function addContent(content, carrot) {
    // Check if multy content is present
    if (typeof content !== "string") {
        // Add multiple lines to content
        editor.addMultyContent(carrot.line, carrot.column, content);
        // Loop each new line
        for (let index = 0; index < content.length; index++) {
            // Get tokenized content
            const markedContent = marker.mark(editor.content[carrot.line + index], scheme.default, scheme);
            // Update line with tokenized content on first and last line then append the rest
            if (index == 0) { view.updateLine(carrot.line + index, markedContent) } 
            else if (index == content.length - 1) { view.updateLine(carrot.line + index, markedContent) } 
            else { view.appendLine(carrot.line + index, markedContent) }
        }
        // Increment carrot line
        carrot.line += content.length - 1;
        // Increment carrot column
        carrot.column = content[content.length - 1].length;
        // Updates main carrot's position
        view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
        // Set carrot index
        carrot.index = carrot.column;
        return;
    }
    // Add event character on set line and column into editor
    editor.addContent(carrot.line, carrot.column, content);
    // Increment carrot column
    carrot.column += content.length;
    // Get tokenized content
    const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
    // Update line with tokenized content
    view.updateLine(carrot.line, markedContent);
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
    // Set carrot index
    carrot.index = carrot.column;
}

// Method to tabulate content
function tabulateContent(carrot, spacing) {
    // Get numer of times to add space for correct spacing
    let formula = spacing - carrot.column % spacing;
    // Create repeated space text
    let tabText = "\xa0".repeat(formula);
    // Add spacetext to content by carrot
    addContent(tabText, carrot);
    // Set carrot index
    carrot.index = carrot.column;
}

// Method remove content
function removeContent(carrot) {
    if (!carrot.column) {
        // If line is 0 return
        if (carrot.line == 0) { return }
        // Set column to previous line length
        carrot.column = editor.lineLength(carrot.line - 1);
        // Remove line from editor
        editor.removeLine(carrot.line);
        // Remove line from view
        view.removeLine(carrot.line);
        // Decrement carrot line
        carrot.line--;
        // Get tokenized content
        const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
        // Update line with tokenized content
        view.updateLine(carrot.line, markedContent);
    } else {
        // Remove one character on current line and column
        editor.removeContent(carrot.line, carrot.column, 1);
        // Decrement column
        carrot.column--;
        // Get tokenized content
        const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
        // Update line with tokenized content
        view.updateLine(carrot.line, markedContent);
    }
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
    // Set carrot index
    carrot.index = carrot.column;
}

function deleteContent(carrot) {
    // Check if we are at the end of line
    if (carrot.column == editor.lineLength(carrot.line)) {
        // If line is 0 return
        if (carrot.line == editor.content.length - 1) { return }
        // Remove line plus one from editor
        editor.removeLine(carrot.line + 1);
        // Remove line plus one from view
        view.removeLine(carrot.line + 1);
        // Get tokenized content
        const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
        // Update line with tokenized content
        view.updateLine(carrot.line, markedContent);
    } else {
        // Remove one character on current line and column plus one
        editor.removeContent(carrot.line, carrot.column + 1, 1);
        // Get tokenized content
        const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
        // Update line with tokenized content
        view.updateLine(carrot.line, markedContent);
    }
}

// Method new line
function newLine(carrot) {
    // Append line on carrot line and column
    editor.appendLine(carrot.line, carrot.column);
    // Get tokenized content
    const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
    // Update line with tokenized content
    view.updateLine(carrot.line, markedContent);
    // Inciment carrot line
    carrot.line++;
    // Reset carrot column
    carrot.column = 0;
    // Get tokenized content
    const markedAppend = marker.mark(editor.content[carrot.line], scheme.default, scheme);
    // Append the new line into view
    view.appendLine(carrot.line, markedAppend);
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
    // Set carrot index
    carrot.index = carrot.column;
}

// Method move down
function moveDown(carrot) {
    // Check if we are at the end of file
    if (carrot.line < editor.content.length - 1) {
        // Increment carrot line
        carrot.line++;
        // Store current line length
        const lineLength = editor.lineLength(carrot.line);
        // Check if carrot index is bigger than current line
        if (carrot.index > lineLength) {
            // Set carrot column to current line length
            carrot.column = lineLength;
        } else {
            // Set carrot column to carrot index 
            carrot.column = carrot.index;
        }
        // Updates main carrot's position
        view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
        // On success return true
        return true;
        // If not preformed return false
    } else { return false }
}

// Method move up
function moveUp(carrot) {
    // Check if we are at start of file
    if (carrot.line > 0) {
        // Decrement carrot line
        carrot.line--;
        // Store current line length
        const lineLength = editor.lineLength(carrot.line);
        // Check if carrot index is bigger than current line
        if (carrot.index > lineLength) {
            // Set carrot column to current line length
            carrot.column = lineLength;
        } else {
            // Set carrot column to carrot index 
            carrot.column = carrot.index;
        }
        // Updates main carrot's position
        view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
        // On success return true
        return true;
        // If not preformed return false
    } else { return false }
}

// Method move left
function moveLeft(carrot, options) {
    // Check if we are at start of line
    if (carrot.column > 0) {
        // Decrement carrot column
        carrot.column--;
    } else {
        // Check if looping is enabled
        if (options && options.loop) {
            // Store if carrot has been moved
            const moved = moveUp(carrot);
            // Check if carrot moved up set column to the end of line
            if (moved) { carrot.column = editor.lineLength(carrot.line) }
        }
    }
    // Set carrot index
    carrot.index = carrot.column;
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
}

// Method move right
function moveRight(carrot, options) {
    // Check if we are at end of line
    if (carrot.column < editor.lineLength(carrot.line)) {
        // Increment carrot column
        carrot.column++;
    } else {
        // Check if looping is enabled
        if (options && options.loop) {
            // Store if carrot has been moved
            const moved = moveDown(carrot);
            // Check if carrot moved down reset column position
            if (moved) { carrot.column = 0 }
        }
    }
    // Set carrot index
    carrot.index = carrot.column;
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
}

// Method move home
function moveHome(carrot, options) {
    // Checks if should find first word character or be set to 0
    let match = options.fromWord ? editor.findChar(carrot.line, "\xa0") : 0;
    // Checks if we haven't found index and then if we aren't already at index set accordingly
    carrot.column = match < 0 || carrot.column == match ? 0 : match;
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
    // Set carrot index
    carrot.index = carrot.column;
}

// Method move to the end of line
function moveEnd(carrot) {
    // Set collumn of carrot to the length of line
    carrot.column = editor.lineLength(carrot.line);
    // Updates main carrot's position
    view.updateCarrot(carrot.carrotID, carrot.column, carrot.line);
    // Set carrot index
    carrot.index = carrot.column;
}

// Export module
export {
    editor,
    marker,
    view,
    createCarrot,
    setScheme,
    moveDown,
    moveUp,
    moveLeft,
    moveRight,
    moveHome,
    moveEnd,
    addContent,
    removeContent,
    newLine,
    tabulateContent,
    deleteContent
}