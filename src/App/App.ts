import SigninView from "./components/SigninView/SigninView.js";
import SignupView from "./components/SignupView/SignupView.js";
import router from "./Router/Router.js";
import paths from "./Router/RouterPaths.js";

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

        const signinView = new SigninView(this.root);
        router.addPath({ path: paths.siginPage, view: signinView });

        const signupView = new SignupView(this.root);
        router.addPath({ path: paths.sigupPage, view: signupView });

        router.goToPath(paths.siginPage);
    }
}

export default App;