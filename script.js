// Import scheme
import scheme from "./syntax/javascript.js";
// Import Core
import {
    view,
    createCarrot,
    setScheme,
    addContent,
    removeContent,
    newLine,
    moveDown,
    moveRight,
    moveLeft,
    moveUp
} from "./main.js";

// Set scheme in core
setScheme(scheme);
// Create new carrot
const carrot = createCarrot();
// Set font width and height
view.fontHeight = 26;
view.fontWidth = 13.2;

// Create keydown event listener and pass it to handler
document.addEventListener("keydown", event => handleKeyboard(event));

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

    if (spaceKey) { addContent("\xa0", carrot) } // On space keypress
    if (basicKeys) { addContent(event.key, carrot) } // On basic input keypress
    if (removeKey) { removeContent(carrot) } // On backspace keypress
    if (newLineKey) { newLine(carrot) } // On enter keypress
    if (rightKey) { moveRight(carrot) } // On right arrow keypress
    if (downKey) { moveDown(carrot) } // On down arrow keypress
    if (leftKey) { moveLeft(carrot) } // On left arrow keypress
    if (upKey) { moveUp(carrot) } // On up arrow keypress
}