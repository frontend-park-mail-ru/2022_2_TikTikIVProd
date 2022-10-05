import { header, mainContentElement, menu, root } from '../App.js';
import Feed from '../components/Feed/Feed.js';
import FooterView from '../components/FooterView/FooterView.js';
import Profile from '../components/Profile/Profile.js';
import SigninFormView from '../components/SigninFormView/SigninFormView.js';
import SignupFormView from '../components/SignupFormView/SignupFormView.js';
import FeedModel from '../models/FeedModel/FeedModel.js';
import UserModel from '../models/UserModel/UserModel.js';
import SigninFormController from '../controllers/SigninFormContoller/SigninFormController.js';
import SignupFormController from '../controllers/SignupFormContoller/SignupFormController.js';
import paths from './RouterPaths.js';
class Router {
    constructor() {
        this.routes = [];
        this.current = undefined;
    }
    addPath(route) {
        this.routes.push(route);
    }
    goToPath(path) {
        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            console.log('No path');
            return;
        }
        item.handler();
    }
    renderFeed(username) {
        mainContentElement.innerHTML = '';
        const feed = new Feed(mainContentElement);
        const feedModel = new FeedModel();
        const data = feedModel.getFeeds();
        feed.render(data);
    }
    renderStartPage(username) {
        header.setLink(username);
        menu.render();
        this.renderFeed(username);
    }
    renderProfile(username) {
        header.setLink(username);
        mainContentElement.innerHTML = '';
        const profile = new Profile(mainContentElement);
        profile.render();
    }
    renderSignIn() {
        mainContentElement.innerHTML = '';
        menu.remove();
        header.setLink('Sign up');
        const signinView = new SigninFormView(mainContentElement);
        const userModel = new UserModel();
        const signinController = new SigninFormController(signinView, userModel);
        this.addPath({ path: paths.signinPage, handler: () => console.log('123') });
        signinView.render();
    }
    renderSignUp() {
        mainContentElement.innerHTML = '';
        menu.remove();
        header.setLink('Sign ip');
        const signupView = new SignupFormView(mainContentElement);
        const userModel = new UserModel();
        const signupController = new SignupFormController(signupView, userModel);
        this.addPath({ path: paths.signupPage, handler: () => console.log('123') });
        signupView.render();
    }
    renderFooter() {
        const footer = new FooterView(root);
        footer.render();
    }
    removeFooter() {
        var _a;
        const footer = (_a = root.getElementsByClassName('footer')) === null || _a === void 0 ? void 0 : _a.item(0);
        if (footer !== null) {
            footer.innerHTML = '';
        }
    }
}
const router = new Router();
export default router;
