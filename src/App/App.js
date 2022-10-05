import Header from './components/Header/Header.js';
import FooterView from './components/FooterView/FooterView.js';
import UserModel from "./models/UserModel/UserModel.js";
import createDiv from './components/BasicComponentsCreators/CreateDiv/CreateDiv.js';
import ajax from './modules/ajax.js';
import renderStartPage from './utils/RenderStartPage.js';
import SigninFormView from './components/SigninFormView/SigninFormView.js';
import Menu from './components/Menu/Menu.js';
import MenuController from './controllers/MenuController/MenuController.js';
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
export { root, header, content, menu, mainContentElement };
class App {
    constructor() { }
    run() {
        // TODO обращение через контроллер
        ajax.getTest('/auth').then(({ status, parsedBody }) => {
            renderStartPage('Павел');
        }).catch(({ status, parsedBody }) => {
            const signinView = new SigninFormView(root);
            const userModel = new UserModel();
            const footer = new FooterView(root);
            signinView.render();
            footer.render();
        });
    }
}
;
export default App;
