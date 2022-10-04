// import router from "./Router/Router.js";
// import paths from "./Router/RouterPaths.js";
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import Feed from './components/Feed/Feed.js';
import FooterView from './components/FooterView/FooterView.js';
// import RenderMainContent from './utils/RenderMainContent.js';
// import config from './configs/config.js'
import SigninView from './components/SigninFormView/SigninFormView.js';
// import SignupView from './components/SignupView/SignupView.js';
// import Profile from "./components/Profile/Profile.js";
import SigninFormController from "./controllers/SigninFormContoller/SigninFormController.js";
import UserModel from "./models/UserModel/UserModel.js";
import createDiv from './components/BasicComponentsCreators/CreateDiv/CreateDiv.js';
import ajax from './modules/ajax.js'
import FeedModel from './models/FeedModel/FeedModel.js';
import renderStartPage from './utils/RenderStartPage.js';

const root = createDiv({ id: 'root' });
document.body.appendChild(root);

const header = new Header(root);
header.render();

const content = createDiv({ styles: ['content'] });
root.appendChild(content);

const menuElement = document.createElement('aside');
menuElement.classList.add('menu');
content.appendChild(menuElement);

const mainContentElement = document.createElement('main');
mainContentElement.classList.add('main');
content.appendChild(mainContentElement);

export { root, header, content, menuElement, mainContentElement };


class App {
    constructor() { }

    run() {
        // TODO обращение через контроллер
        ajax.getTest('/auth').then(({ status, parsedBody }) => {
            renderStartPage();

        }).catch(({ status, parsedBody }) => {
            const signinView = new SigninView(root);
            const userModel = new UserModel();
            const signinContrl = new SigninFormController(signinView, userModel);
            const footer = new FooterView(root);
            signinView.render();
            footer.render();
        })

    }
};

export default App;