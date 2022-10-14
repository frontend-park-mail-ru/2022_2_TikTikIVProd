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
import FeedView from "./Views/FeedView/FeedView.js";
import FeedController from "./Controllers/FeedController/FeedController.js";
import FeedModel from "./Models/FeedModel/FeedModel.js";
import HeaderView from "./Views/HeaderView/HeaderView.js";
import HeaderController from "./Controllers/HeaderController/HeaderController.js";
import FooterView from "./Views/FooterView/FooterView.js";
import FooterController from "./Controllers/FooterController/FooterController.js";

export default class App {
    // States

    // Views
    private signinView: SigninView;
    private signupView: SignupView;
    private menuView: MenuView;
    private feedView: FeedView;
    private headerView: HeaderView;
    private footerView: FooterView;

    // Models
    private userModel: UserModel;
    private feedModel: FeedModel;

    // Controllers
    private signinController: SigninController;
    private signupController: SignupController;
    private menuController: MenuController;
    private feedController: FeedController;
    private headerController: HeaderController;
    private footerController: FooterController;

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
        // unmount
        this.signupController.unmountComponent();
        this.menuController.unmountComponent();
        this.feedController.unmountComponent();
        // mount
        this.headerController.mountComponent();
        this.footerController.mountComponent();
        this.signinController.mountComponent();
        //states
        this.headerView.changeHeaderItem('signup');
    }

    private handleRedirectToSignup() {
        // unmount
        this.signinController.unmountComponent();
        this.menuController.unmountComponent();
        this.feedController.unmountComponent();
        // mount
        this.headerController.mountComponent();
        this.footerController.mountComponent();
        this.signupController.mountComponent();
        //states
        this.headerView.changeHeaderItem('signin');
    }

    private handleRedirectToFeed() {
        // unmount
        this.signinController.unmountComponent();
        this.signupController.unmountComponent();
        this.footerController.unmountComponent();
        // mount
        this.headerController.mountComponent();
        this.menuController.mountComponent();
        this.feedController.mountComponent();
        //states
        this.headerView.changeHeaderItem('profile');
    }

    private handleLogout() {
        router.goToPath(paths.signinPage);
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
        this.feedView = new FeedView(this.content);
        this.headerView = new HeaderView(this.header);
        this.footerView = new FooterView(this.footer);
    }

    private initModels() {
        this.userModel = new UserModel();
        this.feedModel = new FeedModel();
    }

    private initControllers() {
        this.signinController = new SigninController(this.signinView, this.userModel);
        this.signupController = new SignupController(this.signupView, this.userModel);
        this.menuController = new MenuController(this.menuView);
        this.feedController = new FeedController(this.feedView, this.feedModel);
        this.headerController = new HeaderController(this.headerView, this.userModel);
        this.footerController = new FooterController(this.footerView);
    }

    private initRoutes() {
        router.addPath({ path: paths.signinPage, handler: this.handleRedirectToSignin.bind(this) });
        router.addPath({ path: paths.signupPage, handler: this.handleRedirectToSignup.bind(this) });
        router.addPath({ path: paths.feedPage, handler: this.handleRedirectToFeed.bind(this) });
        router.addPath({ path: paths.logout, handler: this.handleLogout.bind(this) });
    }
}