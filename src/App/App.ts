import SigninView from "./components/SigninView/SigninView.js";
import SignupView from "./components/SignupView/SignupView.js";

class App {
    private root: HTMLElement;
    constructor() {
        console.log('App ctor');
        const root = document.getElementById('root');
        if (root === null) {
            throw new Error("No root element");
        }
        this.root = root;
    }

    run(): void {
        this.root.innerHTML = '';
        const authForm = new SignupView(this.root);
        authForm.render();
    }
}

export default App;