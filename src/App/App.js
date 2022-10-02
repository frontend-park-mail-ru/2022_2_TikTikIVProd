import router from "./Router/Router.js";
import paths from "./Router/RouterPaths.js";
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import Feed from './components/Feed/Feed.js';
import FooterView from './components/FooterView/FooterView.js';
import config from './configs/config.js';
import SigninView from './components/SigninView/SigninView.js';
import SignupView from './components/SignupView/SignupView.js';
import Profile from "./components/Profile/Profile.js";
class App {
    constructor() {
        const root = document.getElementById('root');
        if (root === null) {
            throw new Error("No root element");
        }
        this.root = root;
        const content = document.createElement('div');
        if (content === null) {
            throw new Error("No root element");
        }
        this.content = content;
        // header
        this.header = new Header(this.root);
        //content
        this.content.classList.add("content");
        this.root.appendChild(this.content);
        //main in content
        this.mainContentElement = document.createElement('main');
        this.mainContentElement.classList.add('main');
        this.content.appendChild(this.mainContentElement);
        //footer
        this.footer = new FooterView(this.root);
    }
    run() {
        this.header.render();
        const authorized = false;
        const menuElement = document.createElement('aside');
        menuElement.classList.add('menu');
        this.content.appendChild(menuElement);
        const menu = new Menu(menuElement);
        menu.items = config.menu;
        router.addPath({ path: paths.menu, view: menu });
        const feed = new Feed(this.mainContentElement);
        router.addPath({ path: paths.feedPage, view: feed });
        const signinView = new SigninView(this.mainContentElement);
        router.addPath({ path: paths.siginPage, view: signinView });
        const signupView = new SignupView(this.mainContentElement);
        router.addPath({ path: paths.sigupPage, view: signupView });
        const profile = new Profile(this.mainContentElement);
        router.addPath({ path: paths.profile, view: profile });
        if (authorized) {
<<<<<<< HEAD
            router.goToPath(paths.menu, false);
            router.goToPath(paths.feedPage, false);
        }
        else {
            router.goToPath(paths.siginPage, true);
=======
            const menuElement = document.createElement('aside');
            menuElement.classList.add('menu');
            this.content.appendChild(menuElement);
            const menu = new Menu(menuElement);
            menu.items = config.menu;
            menu.render();
            this.mainContentElement.appendChild(renderFeed());
            this.root.addEventListener('click', (e) => {
                const target = e.target;
                if (target instanceof HTMLAnchorElement && target.dataset.section != undefined) {
                    e.preventDefault();
                    RenderMainContent(this.root, this.mainContentElement, config.menu[target.dataset.section]);
                }
            });
        }
        else {
            const signinPage = new SigninView(this.mainContentElement);
            signinPage.render();
            // const signupPage = new SignupView(mainContentElement);
            // signupPage.render();
>>>>>>> 18fffb1f59e83392d8f571d4fd1ca1ae77651e61
        }
        this.footer.render();
        this.root.addEventListener('click', (event) => {
            const target = event.target;
            event.preventDefault();
            if (target instanceof HTMLAnchorElement && target.dataset.section != undefined) {
                switch (target.id) {
                    case "menu__item_0":
                        router.goToPath(paths.feedPage, false);
                        break;
                    case "menu__item_1":
                        router.goToPath(paths.profile, false);
                        break;
                    default:
                        break;
                }
                // RenderMainContent(this.root, this.mainContentElement, config.menu[target.dataset.section]);
            }
        });
    }
}
;
export default App;
