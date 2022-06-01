// Import classes
import Editor from "./Editor.js";
import Carrot from "./Carrot.js";
import View from "./View.js";
import Marker from "./Marker.js";

// Create new editor
const editor = new Editor();
// Create new carrot with default postion
const carrot = new Carrot();
// Create new view with root element
const view = new View(document.querySelector("main"));
// Create new highlighter
const marker = new Marker();
// Scheme storage
let scheme = null;

// Set font width and height
view.fontHeight = 26;
view.fontWidth = 13.2;
// Add carrot to view
const carrotID = view.addCarrot();

// Method for setting scheme
function setScheme(newScheme) {
    scheme = newScheme;
}

// Add content method
function addContent(char) {
    // Add event character on set line and column into editor
    editor.addContent(carrot.line, carrot.column, char);
    // Increment carrot column
    carrot.column++;
    // Get tokenized content
    const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
    // Update line with tokenized content
    view.updateLine(carrot.line, markedContent);
    // Updates main carrot's position
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

// Method remove content
function removeContent() {
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
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

// Method new line
function newLine() {
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
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

// Method move down
function moveDown() {
    // Check if we are at the end of file
    if (carrot.line < editor.content.length) {
        // Increment carrot line
        carrot.line++;
        // Check if we aren't exceeding line length
        if (editor.lineLength(carrot.line) < carrot.column) {
            // Set carrot column to current line length
            carrot.column = editor.lineLength(carrot.line);
        }
    }

    // Updates main carrot's position
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

// Method move up
function moveUp() {
    // Check if we are at start of file
    if (carrot.line > 0) {
        // Decrement carrot line
        carrot.line--;
        // Check if we aren't exceeding line length
        if (editor.lineLength(carrot.line) < carrot.column) {
            // Set carrot column to current line length
            carrot.column = editor.lineLength(carrot.line);
        }
    }

    // Updates main carrot's position
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

// Method move left
function moveLeft() {
    // Check if we are at start of line
    if (carrot.column > 0) {
        // Decrement carrot column
        carrot.column--;
    } else {

    }

    // Updates main carrot's position
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

// Method move right
function moveRight() {
    // Check if we are at end of line
    if (carrot.column < editor.lineLength(carrot.line)) {
        // Increment carrot column
        carrot.column++;
    } else {

    }
    // Updates main carrot's position
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}

export { setScheme,moveDown, moveUp, moveLeft, moveRight, addContent, removeContent, newLine }