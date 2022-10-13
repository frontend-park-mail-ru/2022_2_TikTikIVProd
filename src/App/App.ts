import baseTemplate from "./Components/Base/Base.js";
import Handlebars from "handlebars";
import SigninView from "./Views/SigninView/SigninView.js";
import SigninController from "./Controllers/SigninController/SigninController.js";
import UserModel from "./Models/UserModel/UserModel.js";
import SignupView from "./Views/SignupView/SignupView.js";
import SignupController from "./Controllers/SignupController/SignupController.js";
import MenuView from "./Views/MenuView/MenuView.js";
import router from "./Router/Router.js";
import paths from "./Router/RouterPaths.js";
import MenuController from "./Controllers/MenuController/MenuController.js";

export default class App {
    // Views
    private signinView: SigninView;
    private signupView: SignupView;
    private menuView: MenuView;
    // Models
    private userModel: UserModel;
    // Controllers
    private signinController: SigninController;
    private signupController: SignupController;
    private menuController: MenuController;
    // Elements
    private root: HTMLElement;
    private header: HTMLElement;
    private footer: HTMLElement;
    private leftSide: HTMLElement;
    private rightSide: HTMLElement;
    private content: HTMLElement;

    constructor() {
        this.initPage();
        this.initViews();
        this.initModels();
        this.initControllers();
        this.initRoutes();
    }

    public run() {
        console.log('App run');
        router.goToPath(paths.feedPage);
    }

    // Redirects
    private handleRedirectToSignin() {
        this.signinView.render();
    }

    private handleRedirectToSignup() {
        this.signupView.render();
    }

    private handleRedirectToFeed() {
        this.menuView.render();
    }

    // Init
    private initPage(): void {
        document.body.innerHTML = baseTemplate({});
        this.root = <HTMLElement>document.body.querySelector('#root');
        this.header = <HTMLElement>document.body.querySelector('#header');
        this.footer = <HTMLElement>document.body.querySelector('#footer');
        this.leftSide = <HTMLElement>document.body.querySelector('.left-menu');
        this.rightSide = <HTMLElement>document.body.querySelector('.right-menu');
        this.content = <HTMLElement>document.body.querySelector('.main-content');
    }

    private initViews() {
        this.signinView = new SigninView(this.content);
        this.signupView = new SignupView(this.content);
        this.menuView = new MenuView(this.leftSide);
    }

    private initModels() {
        this.userModel = new UserModel();
    }

    private initControllers() {
        this.signinController = new SigninController(this.signinView, this.userModel);
        this.signupController = new SignupController(this.signupView, this.userModel);
        this.menuController = new MenuController(this.menuView);
    }

    private initRoutes() {
        router.addPath({ path: paths.signinPage, handler: this.handleRedirectToSignin.bind(this) });
        router.addPath({ path: paths.signupPage, handler: this.handleRedirectToSignup.bind(this) });
        router.addPath({ path: paths.feedPage, handler: this.handleRedirectToFeed.bind(this) });
    }
}