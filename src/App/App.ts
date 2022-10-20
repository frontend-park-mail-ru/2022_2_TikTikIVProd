import baseTemplate from "./Components/Base/Base.hbs";
import router from "./Router/Router";
import paths from "./Router/RouterPaths";

import SigninView from "./Views/SigninView/SigninView";
import SigninController from "./Controllers/SigninController/SigninController";

import SignupView from "./Views/SignupView/SignupView";
import SignupController from "./Controllers/SignupController/SignupController";

import MenuView from "./Views/MenuView/MenuView";
import MenuController from "./Controllers/MenuController/MenuController";

import FeedView from "./Views/FeedView/FeedView";
import FeedController from "./Controllers/FeedController/FeedController";

import HeaderView from "./Views/HeaderView/HeaderView";
import HeaderController from "./Controllers/HeaderController/HeaderController";

import FooterView from "./Views/FooterView/FooterView";
import FooterController from "./Controllers/FooterController/FooterController";

import UserModel from "./Models/UserModel/UserModel";
import FeedModel from "./Models/FeedModel/FeedModel";


// TODO delete 
import config from "./Configs/Config";
import ajax from "./Modules/Ajax";
//


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
        router.start(paths.signinPage);
    }

    // Redirects
    private handleRedirectToSignin() {
        this.userModel.isAuthantificated().then(({ status, body }) => {
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {

            // unmount
            this.signupController.unmountComponent();
            this.menuController.unmountComponent();
            this.feedController.unmountComponent();
            // mount
            this.headerController.mountComponent();
            this.footerController.mountComponent();
            this.signinController.mountComponent();
            //states
            this.headerView.changeHeaderItem('signupButton');

        });
    }

    private handleRedirectToSignup() {
        this.userModel.isAuthantificated().then(({ status, body }) => {
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {

            // unmount
            this.signinController.unmountComponent();
            this.menuController.unmountComponent();
            this.feedController.unmountComponent();
            // mount
            this.headerController.mountComponent();
            this.footerController.mountComponent();
            this.signupController.mountComponent();
            //states
            this.headerView.changeHeaderItem('signinButton');

        });
    }

    private handleRedirectToFeed() {
        this.userModel.isAuthantificated().then(({ status, body }) => {

            // unmount
            this.signinController.unmountComponent();
            this.signupController.unmountComponent();
            this.footerController.unmountComponent();
            // mount
            this.headerController.mountComponent();
            this.menuController.mountComponent();
            this.feedController.mountComponent();
            //states
            this.headerView.changeHeaderItem('profile',Object.assign({user_avatar: '../src/img/test_avatar.jpg'}, this.userModel.currentUser));

        }).catch(({ status, body }) => {
            router.goToPath(paths.signinPage);
        });
    }

    private handleLogout() {
        ajax.get(`${config.APIUrl}/logout`).catch(() => {

            router.goToPath(paths.signinPage);
        });
        // TODO fix cors
        // this.userModel.logoutUser().then(({ status, body }) => {
        //     router.goToPath(paths.signinPage);
        // }).catch(({ status, body }) => {
        //     console.log('logout err: ', status, body);
        // });
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