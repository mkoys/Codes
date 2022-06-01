// Import classes
import Editor from "./Editor.js";
import Carrot from "./Carrot.js";
import View from "./View.js";
import Marker from "./Marker.js";

// Create keydown event listener and pass it to handler
document.addEventListener("keydown", event => handleKeyboard(event));

// Create new editor
const editor = new Editor();
// Create new carrot with default postion
const carrot = new Carrot();
// Create new view with root element
const view = new View(document.querySelector("main"));
// Create new highlighter
const marker = new Marker();

// Set font width and height
view.fontHeight = 26;
view.fontWidth = 13.2;
// Add carrot to view
const carrotID = view.addCarrot();

// Handles keyboard input
function handleKeyboard(event) {
    const spaceKey = event.keyCode == 32; // Space key
    const removeKey = event.keyCode == 8; // Remove key
    const newLineKey = event.keyCode == 13; // New Line key

    const upKey = event.keyCode == 38; // Up key
    const downKey = event.keyCode == 40; // Down key
    const leftKey = event.keyCode == 37; // left key
    const rightKey = event.keyCode == 39; // right key

    const aplhaNumKeys = event.keyCode > 47 && event.keyCode < 91; // AplhaNumeric key
    const numericKeys = event.keyCode > 95 && event.keyCode < 112; // Numberic key
    const specialKeys = event.keyCode > 183 && event.keyCode < 224; // Spcial character key
    const basicKeys = aplhaNumKeys || numericKeys || specialKeys; // Basic typing keys together

    // Scheme for syntax Highlighting
    const scheme = {
        default: /(?<let>\blet\b)|(?<const>\bconst\b)|(?<operator>\-\=|\+\=|\-|\+|\\|\/|\%)|(?<signs>\=|\,)|(?<number>\b[0-9]+\b)|(?<func>\bfunction\b\s+\w+(\s+|)\(.*\))|(?<function>\bfunction\b)/gm,
        func: /(?<function>\bfunction\b)|(?<params>\(.*\))|(?<functionName>\w)/gm,
        params: /(?<bracket>\(|\))|(?<default>.*)/gm
    }

    // On basic key press
    if (basicKeys) {
        // Add event character on set line and column into editor
        editor.addContent(carrot.line, carrot.column, event.key);
        // Increment carrot column
        carrot.column++;
        // Get tokenized content
        const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
        // Update line with tokenized content
        view.updateLine(carrot.line, markedContent);
    }

    // On space key press
    if (spaceKey) {
        // Add empty space on set line and column into editor
        editor.addContent(carrot.line, carrot.column, "\xa0");
        // Increment carrot column
        carrot.column++;
        // Get tokenized content
        const markedContent = marker.mark(editor.content[carrot.line], scheme.default, scheme);
        // Update line with tokenized content
        view.updateLine(carrot.line, markedContent);
    }

    // On remove key press
    if (removeKey) {
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
    }

    // On new line key press
    if (newLineKey) {
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
    }

    if(downKey) {
        if(carrot.line < editor.content.length) {
            carrot.line++;
        }
    }

    if(upKey) {
        if(carrot.line > 0) {
            carrot.line--;
        }
    }

    if(leftKey) {
        if(carrot.column > 0) {
            carrot.column--;
        }else {

        }
    }

    if(rightKey) {
        if(carrot.column < editor.lineLength(carrot.line)) {
            carrot.column++;
        }else {
            
        }
    }

    // Updates main carrot's position
    view.updateCarrot(carrotID, carrot.column, carrot.line);
}