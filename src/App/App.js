import SigninFormView from './components/SigninFormView/SigninFormView.js';
import SignupFormView from './components/SignupFormView/SignupFormView.js';
import FooterView from './components/FooterView/FooterView.js';
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import Feed from './components/Feed/Feed.js';
import SigninFormController from './controllers/SigninFormContoller/SigninFormController.js';
import SignupFormController from './controllers/SignupFormContoller/SignupFormController.js';
import createDiv from './components/BasicComponentsCreators/CreateDiv/CreateDiv.js';
import UserModel from './models/UserModel/UserModel.js';
import router from './Router/Router.js';
import paths from './Router/RouterPaths.js';
import FeedModel from './models/FeedModel/FeedModel.js';
// const root = createDiv({ id: 'root' });
// document.body.appendChild(root);
// const header = new Header(root);
// header.render();
// const content = createDiv({ styles: ['content'] });
// root.appendChild(content);
// const menuElement = document.createElement('aside');
// menuElement.classList.add('menu');
// content.appendChild(menuElement);
// const menu = new Menu(menuElement);
// const menuController = new MenuController(menu);
// const mainContentElement = document.createElement('main');
// mainContentElement.classList.add('main');
// content.appendChild(mainContentElement);
// export { root, header, content, menu, mainContentElement };
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
        // this.userModel.authUser(); // Авторизация по куке
        if (this.userModel.isAuthantificated()) {
            console.log('User authantificated');
            router.goToPath(paths.feedPage);
        }
        else {
            console.log('User is not authantificated');
            router.goToPath(paths.signinPage);
        }
    }
    // Handlers 
    handleRedirectToSignin() {
        this.content.innerHTML = '';
        // Обновить хэдер
        this.headerView.setSignupButton();
        this.headerView.show();
        this.footerView.show();
        this.signinView.render();
    }
    handleRedirectToSignup() {
        this.content.innerHTML = '';
        // Обновить хэдер
        this.headerView.setSigninButton();
        this.headerView.show();
        this.footerView.show();
        this.signupView.render();
    }
    handleRedirectToFeedPage() {
        this.content.innerHTML = '';
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
        // Показать меню
        this.menuView.render();
        // показать фид
        this.feedView.render(this.feedModel.getFeeds());
    }
    /// Initials 
    initPage() {
        this.root = createDiv({ id: 'root' });
        this.header = createDiv({ id: 'header' });
        this.content = createDiv({ id: 'content' });
        this.footer = createDiv({ id: 'footer' });
        this.root.appendChild(this.header);
        this.root.appendChild(this.content);
        this.root.appendChild(this.footer);
        document.body.appendChild(this.root);
    }
    initViews() {
        this.signinView = new SigninFormView(this.content);
        this.signupView = new SignupFormView(this.content);
        this.footerView = new FooterView(this.footer);
        this.headerView = new Header(this.header);
        this.menuView = new Menu(this.content);
        this.feedView = new Feed(this.content);
    }
    initModels() {
        this.userModel = new UserModel();
        this.feedModel = new FeedModel();
    }
    initControllers() {
        this.signinController = new SigninFormController(this.signinView, this.userModel);
        this.signupController = new SignupFormController(this.signupView, this.userModel);
    }
    initRouter() {
        router.addPath({ path: paths.signinPage, handler: this.handleRedirectToSignin.bind(this) });
        router.addPath({ path: paths.signupPage, handler: this.handleRedirectToSignup.bind(this) });
        router.addPath({ path: paths.feedPage, handler: this.handleRedirectToFeedPage.bind(this) });
    }
}
;
export default App;
