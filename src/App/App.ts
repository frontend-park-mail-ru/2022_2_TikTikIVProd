import router from "./Router/Router.js";
import paths from "./Router/RouterPaths.js";
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import renderFeed from './components/Feed/Feed.js';
import FooterView from './components/FooterView/FooterView.js';
import RenderMainContent from './utils/RenderMainContent.js';
import config from './configs/config.js'
import SigninView from './components/SigninView/SigninView.js';
import SignupView from './components/SignupView/SignupView.js';
class App {
    private root: HTMLElement;

    private header: Header;
    private content: HTMLElement;
    private mainContentElement: HTMLElement;
    private footer: FooterView;

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
    
    run(): void {
        this.header.render();

        const authorized = false;

        if (authorized) {
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
            const signinView = new SigninView(this.mainContentElement);
            router.addPath({ path: paths.siginPage, view: signinView });

            const signupView = new SignupView(this.mainContentElement);
            router.addPath({ path: paths.sigupPage, view: signupView });

            router.goToPath(paths.siginPage);
        }


        this.footer.render()
    }
};

export default App;