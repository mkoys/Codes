// Import classes
import Editor from "./Editor.js";
import Carrot from "./Carrot.js";

// Create keydown event listener and pass it to handler
document.addEventListener("keydown", event => handleKeyboard(event));

// Create new editor
const editor = new Editor();
// Create new carrot with default postion
const carrot  = new Carrot();

// Handles keyboard input
function handleKeyboard(event) {

}