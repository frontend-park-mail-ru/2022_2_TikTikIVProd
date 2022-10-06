import SigninFormView from './components/SigninFormView/SigninFormView.js';
import SignupFormView from './components/SignupFormView/SignupFormView.js';
import FooterView from './components/FooterView/FooterView.js';
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import Feed from './components/Feed/Feed.js';
import SigninFormController from './controllers/SigninFormContoller/SigninFormController.js';
import SignupFormController from './controllers/SignupFormContoller/SignupFormController.js';
import MenuController from './controllers/MenuController/MenuController.js';
import createDiv from './components/BasicComponentsCreators/CreateDiv/CreateDiv.js';
import UserModel from './models/UserModel/UserModel.js';
import router from './Router/Router.js';
import paths from './Router/RouterPaths.js';
import FeedModel from './models/FeedModel/FeedModel.js';
import Profile from './components/Profile/Profile.js';
class App {
    constructor() {
        this.initPage();
        this.initModels();
        this.initViews();
        this.initControllers();
        this.initRouter();
    }
    run() {
        this.footerView.render();
        this.headerView.render();
        this.userModel.isAuthantificated().then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            router.goToPath(paths.signinPage);
        }); // Авторизация по куке
    }
    // Handlers 
    handleRedirectToSignin() {
        this.menu.innerHTML = '';
        this.main.innerHTML = '';
        // Обновить хэдер
        this.headerView.setSignupButton();
        this.headerView.show();
        this.footerView.show();
        this.signinView.render();
    }
    handleRedirectToSignup() {
        this.menu.innerHTML = '';
        this.main.innerHTML = '';
        // Обновить хэдер
        this.headerView.setSigninButton();
        this.headerView.show();
        this.footerView.show();
        this.signupView.render();
    }
    handleRedirectMenu() {
        this.menu.innerHTML = '';
        this.menuView.render();
    }
    handleRedirectToFeedPage() {
        this.main.innerHTML = '';
        this.headerView.show();
        // скрыть футер
        this.footerView.hide();
        // Обновить хэдер
        if (this.userModel.isAuthantificated()) {
            this.headerView.setProfile(this.userModel.getCurrentUser());
        }
        else {
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
    handleRedirectProfile() {
        this.main.innerHTML = '';
        this.headerView.show();
        // скрыть футер
        this.footerView.hide();
        // Обновить хэдер
        if (this.userModel.isAuthantificated()) {
            this.headerView.setProfile(this.userModel.getCurrentUser());
        }
        else {
            this.headerView.setSigninButton();
        }
        this.profileView.render();
    }
    /// Initials 
    initPage() {
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
    initViews() {
        this.signinView = new SigninFormView(this.main);
        this.signupView = new SignupFormView(this.main);
        this.footerView = new FooterView(this.footer);
        this.headerView = new Header(this.header);
        this.menuView = new Menu(this.menu);
        this.feedView = new Feed(this.main);
        this.profileView = new Profile(this.main);
    }
    initModels() {
        this.userModel = new UserModel();
        this.feedModel = new FeedModel();
    }
    initControllers() {
        this.signinController = new SigninFormController(this.signinView, this.userModel);
        this.signupController = new SignupFormController(this.signupView, this.userModel);
        this.menuController = new MenuController(this.menuView);
    }
    initRouter() {
        router.addPath({ path: paths.signinPage, handler: this.handleRedirectToSignin.bind(this) });
        router.addPath({ path: paths.signupPage, handler: this.handleRedirectToSignup.bind(this) });
        router.addPath({ path: paths.feedPage, handler: this.handleRedirectToFeedPage.bind(this) });
        router.addPath({ path: paths.profile, handler: this.handleRedirectProfile.bind(this) });
        router.addPath({ path: paths.menu, handler: this.handleRedirectMenu.bind(this) });
    }
}
;
export default App;
