import App from "./App/App.js";
HTMLElement.prototype.appendChildren = function (...nodes) {
    for (var i = 0; i < arguments.length; i++) {
        this.appendChild(arguments[i]);
    }
    return this;
};
(function () {
    const app = new App();
    app.run();
})();
