// Carrot is a typing currsor class
export default class Carrot {
    constructor(line, column) {
        // X Position of carrot
        this.line = line ? line : 0; // Set line to provided else 0
        // Y Position of carrot
        this.column = column ? column : 0; // Set column to provided else 0
        // Last line index
        this.index = 0;
    }
}