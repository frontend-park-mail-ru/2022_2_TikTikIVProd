import baseTemplate from "./Components/Base/Base.js";
import Handlebars from "handlebars";
import SigninView from "./Views/SigninView/SigninView.js";
import SigninController from "./Controllers/SigninController/SigninController.js";
import UserModel from "./Models/UserModel/UserModel.js";
import SignupView from "./Views/SignupView/SignupView.js";
import SignupController from "./Controllers/SignupController/SignupController.js";

export default class App {
    private root: HTMLElement;
    constructor() {
        document.body.innerHTML = baseTemplate({});

        const root = <HTMLElement>document.body.querySelector('#root');
        if (root === null) {
            throw Error('No root element');
        }
        this.root = root;
    }

    public run() {
        console.log('App run');

        //
        const c = <HTMLElement>this.root.querySelector('.main-content');
        if (c === null) {
            return;
        }
        const v = new SignupView(c);
        const m = new UserModel();
        const vc = new SignupController(v, m);
        v.render();
    }
}