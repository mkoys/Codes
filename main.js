// Import classes
import Editor from "./Editor.js";
import Carrot from "./Carrot.js";

// Create keydown event listener and pass it to handler
document.addEventListener("keydown", event => handleKeyboard(event));

// Create new editor
const editor = new Editor();
// Create new carrot with default postion
const carrot = new Carrot();

// Handles keyboard input
function handleKeyboard(event) {
    const spaceKey = event.keyCode == 32; // Space key
    const removeKey = event.keyCode == 8; // Remove key
    const newLineKey = event.keyCode == 13; // New Line key 

    const aplhaNumKeys = event.keyCode > 47 && event.keyCode < 91; // AplhaNumeric key
    const numericKeys = event.keyCode > 95 && event.keyCode < 112; // Numberic key
    const specialKeys = event.keyCode > 183 && event.keyCode < 224; // Spcial character key
    const basicKeys = aplhaNumKeys || numericKeys || specialKeys; // Basic typing keys together

    // On basic key press
    if (basicKeys) {
        // Add event character on set line and column into editor
        editor.addContent(carrot.line, carrot.column, event.key);
        // Increment carrot column
        carrot.column++;
    }

    // On space key press
    if (spaceKey) {
        // Add empty space on set line and column into editor
        editor.addContent(carrot.line, carrot.column, "\xa0");
        // Increment carrot column
        carrot.column++;
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
            // Decrement carrot line
            carrot.line--;
        } else {
            // Remove one character on current line and column
            editor.removeContent(carrot.line, carrot.column, 1);
            // Decrement column
            carrot.column--;
        }
    }

    // On new line key press
    if (newLineKey) {
        editor.appendLine(carrot.line, carrot.column);
        carrot.line++;
        carrot.column = 0;
    }

    console.log(editor.content, carrot);
}