import App from "./App/App.js"
// TODO: move to module
// Problem: Объявления "module" можно использовать только в файлах TypeScript.
declare global {
    interface HTMLElement {
        appendChildren(...nodes: (string | Node)[]): HTMLElement
    }
}

HTMLElement.prototype.appendChildren = function (...nodes: (string | Node)[]): HTMLElement {
    for (var i = 0; i < arguments.length; i++) {
        this.appendChild(arguments[i]);
    }
    return this;
};

(function () {
    const app = new App();
    app.run();
})();