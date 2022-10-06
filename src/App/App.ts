import SigninFormView from './components/SigninFormView/SigninFormView.js'
import SignupFormView from './components/SignupFormView/SignupFormView.js'
import FooterView from './components/FooterView/FooterView.js'
import Header from './components/Header/Header.js'
import Menu from './components/Menu/Menu.js'
import Feed from './components/Feed/Feed.js'

import SigninFormController from './controllers/SigninFormContoller/SigninFormController.js'
import SignupFormController from './controllers/SignupFormContoller/SignupFormController.js'
import MenuController from './controllers/MenuController/MenuController.js'

import createDiv from './components/BasicComponentsCreators/CreateDiv/CreateDiv.js';

import UserModel from './models/UserModel/UserModel.js'

import router from './Router/Router.js'
import paths from './Router/RouterPaths.js'

import ajax from './modules/ajax.js'
import FeedModel from './models/FeedModel/FeedModel.js'
import MenuModel from './models/MenuModel/MenuModel.js'
import Profile from './components/Profile/Profile.js'

class App {
    // Elements
    private root: HTMLElement;
    private header: HTMLElement;
    private content: HTMLElement;
    private menu: HTMLElement;
    private main: HTMLElement;
    private footer: HTMLElement;

    //Views 
    private signinView: SigninFormView;
    private signupView: SignupFormView;
    private footerView: FooterView;
    private headerView: Header;
    private menuView: Menu;
    private feedView: Feed;
    private profileView: Profile;

    //Controllers 
    private signinController: SigninFormController;
    private signupController: SignupFormController;
    private menuController: MenuController;


    //models
    private userModel: UserModel;
    private feedModel: FeedModel;

    constructor() {
        this.initPage();
        this.initModels();
        this.initViews();
        this.initControllers();
        this.initRouter();
    }

    public run(): void {
        this.footerView.render();
        this.headerView.render();

        this.userModel.isAuthantificated().then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            router.goToPath(paths.signinPage)
        }); // Авторизация по куке
    }

    // Handlers 
    private handleRedirectToSignin(): void {
        this.menu.innerHTML = '';
        this.main.innerHTML = '';
        // Обновить хэдер
        this.headerView.setSignupButton();
        this.headerView.show();
        this.footerView.show();
        this.signinView.render();
    }

    private handleRedirectToSignup(): void {
        this.menu.innerHTML = '';
        this.main.innerHTML = '';
        // Обновить хэдер
        this.headerView.setSigninButton();
        this.headerView.show();

        this.footerView.show();

        this.signupView.render();
    }

    private handleRedirectMenu(): void {
        this.menu.innerHTML = '';
        this.menuView.render();
    }

    private handleRedirectToFeedPage(): void {
        this.main.innerHTML = '';

        this.headerView.show();

        // скрыть футер
        this.footerView.hide();

        // Обновить хэдер
        if (this.userModel.isAuthantificated()) {
            this.headerView.setProfile(this.userModel.getCurrentUser());
        } else {
            this.headerView.setSigninButton();
        }


        // показать фид
        const data = this.feedModel.getFeeds()
            .then(({ status, body }) => {
                this.feedView.render(body);
            })
            .catch(({ status, body }) => {
                router.goToPath(paths.signinPage);
            });
        // console.log(data);
    }

    private handleRedirectProfile(): void {
        this.main.innerHTML = '';

        this.headerView.show();

        // скрыть футер
        this.footerView.hide();

        // Обновить хэдер
        if (this.userModel.isAuthantificated()) {
            this.headerView.setProfile(this.userModel.getCurrentUser());
        } else {
            this.headerView.setSigninButton();
        }

        this.profileView.render();
    }


    /// Initials 


    private initPage(): void {
        this.root = createDiv({ id: 'root' });
        this.header = createDiv({ id: 'header' });
        this.content = createDiv({ id: 'content' });
        this.menu = createDiv({ id: 'menu' });
        this.main = createDiv({ id: 'main' });
        this.footer = createDiv({ id: 'footer' });
        this.root.appendChild(this.header);
        this.root.appendChild(this.content);
        this.content.appendChild(this.menu);
        this.content.appendChild(this.main);
        this.root.appendChild(this.footer);
        document.body.appendChild(this.root);
    }

    private initViews(): void {
        this.signinView = new SigninFormView(this.main);
        this.signupView = new SignupFormView(this.main);
        this.footerView = new FooterView(this.footer);
        this.headerView = new Header(this.header);
        this.menuView = new Menu(this.menu);
        this.feedView = new Feed(this.main);
        this.profileView = new Profile(this.main);
    }

    private initModels(): void {
        this.userModel = new UserModel();
        this.feedModel = new FeedModel();
    }

    private initControllers(): void {
        this.signinController = new SigninFormController(this.signinView, this.userModel);
        this.signupController = new SignupFormController(this.signupView, this.userModel);
        this.menuController = new MenuController(this.menuView);
    }

    private initRouter(): void {
        router.addPath({ path: paths.signinPage, handler: this.handleRedirectToSignin.bind(this) });
        router.addPath({ path: paths.signupPage, handler: this.handleRedirectToSignup.bind(this) });
        router.addPath({ path: paths.feedPage, handler: this.handleRedirectToFeedPage.bind(this) });
        router.addPath({ path: paths.profile, handler: this.handleRedirectProfile.bind(this) });
        router.addPath({ path: paths.menu, handler: this.handleRedirectMenu.bind(this) });
    }
};

export default App;