// This class is responsible for rendering text to the site view
export default class View {
    constructor(root) {
        this.root = root; // Root element
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
            // Add tokens text to token element
            tokenElement.textContent = token.text;
            // Append token element to line element
            lineElement.appendChild(tokenElement);
        });

        // If child with line index doesn't exist on root element
        if(!this.root.children[line]) {
            // Append new child with line element
            this.root.appendChild(lineElement);
        }else {
            // Replace root's element child with new line element
            this.root.replaceChild(lineElement, this.root.children[line]);
        }
    }
}