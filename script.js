import Carrot from "./Carrot.js";
import {view,createCarrot, setScheme,addContent, removeContent, newLine, moveDown, moveRight, moveLeft, moveUp} from "./main.js";

const carrot = createCarrot();

// Create keydown event listener and pass it to handler
document.addEventListener("keydown", event => handleKeyboard(event));

// Set font width and height
view.fontHeight = 26;
view.fontWidth = 13.2;

// Scheme for syntax Highlighting
const scheme = {
    default: /(?<let>\blet\b)|(?<const>\bconst\b)|(?<operator>\-\=|\+\=|\-|\+|\\|\/|\%)|(?<signs>\=|\,)|(?<number>\b[0-9]+\b)|(?<func>\bfunction\b\s+\w+(\s+|)\(.*\))|(?<function>\bfunction\b)/gm,
    func: /(?<function>\bfunction\b)|(?<params>\(.*\))|(?<functionName>\w)/gm,
    params: /(?<bracket>\(|\))|(?<default>.*)/gm
}

setScheme(scheme);

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

    if(spaceKey) {
        addContent("\xa0", carrot);
    }

    if(basicKeys) {
        addContent(event.key, carrot);
    }

    if(removeKey) {
        removeContent(carrot);
    }

    if(newLineKey) {
        newLine(carrot);
    }

    if(rightKey) {
        moveRight(carrot);
    }

    if(leftKey) {
        moveLeft(carrot);
    }

    if(downKey) {
        moveDown(carrot);
    }

    if(upKey) {
        moveUp(carrot);
    }
}