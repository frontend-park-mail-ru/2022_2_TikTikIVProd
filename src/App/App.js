import Header from './components/Header/Header.js';
import createDiv from './components/BasicComponentsCreators/CreateDiv/CreateDiv.js';
import ajax from './modules/ajax.js';
import Menu from './components/Menu/Menu.js';
import MenuController from './controllers/MenuController/MenuController.js';
import router from './Router/Router.js';
import UserModel from './models/UserModel/UserModel.js';
import SignupFormView from './components/SignupFormView/SignupFormView.js';
import SignupFormController from './controllers/SignupFormContoller/SignupFormController.js';
import paths from './Router/RouterPaths.js';
import SigninFormView from './components/SigninFormView/SigninFormView.js';
import SigninFormController from './controllers/SigninFormContoller/SigninFormController.js';
const root = createDiv({ id: 'root' });
document.body.appendChild(root);
const header = new Header(root);
header.render();
const content = createDiv({ styles: ['content'] });
root.appendChild(content);
const menuElement = document.createElement('aside');
menuElement.classList.add('menu');
content.appendChild(menuElement);
const menu = new Menu(menuElement);
const menuController = new MenuController(menu);
const mainContentElement = document.createElement('main');
mainContentElement.classList.add('main');
content.appendChild(mainContentElement);
const userModel = new UserModel();
const signupView = new SignupFormView(mainContentElement);
const signupController = new SignupFormController(signupView, userModel);
router.addPath({ path: paths.signupPage, handler: () => console.log('123') });
const signinView = new SigninFormView(mainContentElement);
const signinController = new SigninFormController(signinView, userModel);
router.addPath({ path: paths.signinPage, handler: () => console.log('123') });
export { userModel, signinView, signupView, root, header, content, menu, mainContentElement };
class App {
    constructor() { }
    run() {
        // TODO обращение через контроллер
        ajax.getTest('/auth').then(({ status, parsedBody }) => {
            const username = ' Павел';
            router.renderStartPage(username);
        }).catch(({ status, parsedBody }) => {
            router.renderSignIn();
            router.renderFooter();
        });
    }
}
;
export default App;
