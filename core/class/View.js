// This class is responsible for rendering text to the site view
export default class View {
    constructor(root) {
        this.root = root; // Root element
        this.editor = root.querySelector(".editor"); // Editor element from root
        this.carrots = [] // Store for carrots
        this.fontWidth = 0; // Font width
        this.fontHeight = 0; // Font height
        
        this.setFont(); // Set font
    }

    // Set's up current font
    setFont() {
        // Create element with pre tag
        let element = document.createElement("pre");
        // Set one letter to content
        element.textContent = " ";
        // Add tester class to it so it's hidden
        element.classList.add("tester");
        // Append it to body
        document.body.appendChild(element);
        // Get bounding info of element
        const elementInfo = element.getBoundingClientRect();
        // Set font width
        this.fontWidth = elementInfo.width;
        // Set font height
        this.fontHeight = elementInfo.height;
        // Remove element from dom
        document.body.removeChild(element);
    }

    // Adds carrot to root element
    addCarrot() {
        // Create carrot element
        const element = document.createElement("div");
        // Set element class
        element.classList.add("carrot");

        // Push to carrot index and prepend to root element
        this.carrots.push(element);
        this.root.prepend(element);
        // Return ID of carrot
        return this.carrots.length - 1;
    }

    // Updates position of carrot
    updateCarrot(id, x, y) {
        // Set's top and left offset in pixels on set element
        this.carrots[id].style.top = (y * this.fontHeight).toString() + "px";
        this.carrots[id].style.left = (x * this.fontWidth).toString() + "px";
    }

    // Removes carrot element
    removeCarrot(id) {
        this.carrots[id].remove();
    }

    // Updates selected line with set tokenized content
    updateLine(line, content) {
        // Create new line element
        const lineElement = document.createElement("pre");
        // Set line element base class
        lineElement.classList.add("line");

        // Loop each token
        content.forEach(token => {
            // Create new token element
            const tokenElement = document.createElement("p");
            // Add base class for token element
            tokenElement.classList.add("token");
            // Add token class for token element
            tokenElement.classList.add(token.type);
            // Add tokens text to token element
            tokenElement.textContent = token.text;
            // Append token element to line element
            lineElement.appendChild(tokenElement);
        });

        // If child with line index doesn't exist on editor element
        if (!this.editor.children[line]) {
            // Append new child with line element
            this.editor.appendChild(lineElement);
        } else {
            // Replace editor's element child with new line element
            this.editor.replaceChild(lineElement, this.editor.children[line]);
        }
    }

    // Appends new line into view
    appendLine(line, content) {
        // Create new line element
        const lineElement = document.createElement("pre");
        // Set line element base class
        lineElement.classList.add("line");

        // Loop each token
        content.forEach(token => {
            // Create new token element
            const tokenElement = document.createElement("p");
            // Add base class for token element
            tokenElement.classList.add("token");
            // Add token class for token element
            tokenElement.classList.add(token.type);
            // Add tokens text to token element
            tokenElement.textContent = token.text;
            // Append token element to line element
            lineElement.appendChild(tokenElement);
        });

        // Insert child before line index
        this.editor.insertBefore(lineElement, this.editor.children[line]);
    }

    // Removes line from view by line index
    removeLine(line) {
        this.editor.removeChild(this.editor.children[line]);
    }
}