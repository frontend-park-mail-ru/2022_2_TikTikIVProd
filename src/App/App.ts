import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import renderFeed from './components/Feed/Feed.js';
import FooterView from './components/FooterView/FooterView.js';
import RenderMainContent from './utils/RenderMainContent.js';
import config from './configs/config.js'
import SigninView from './components/SigninView/SigninView.js';
import SignupView from './components/SignupView/SignupView.js';

// /feed
// /signin
// /signup

class App {
    private root: HTMLElement;

    private header: Header;
    private content: HTMLElement;
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

        this.header = new Header(this.root);
        this.content.classList.add("content");
        this.root.appendChild(this.content);
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


            const mainContentElement = document.createElement('main');
            mainContentElement.classList.add('main');
            this.content.appendChild(mainContentElement);
            mainContentElement.appendChild(renderFeed());

            this.root.addEventListener('click', (e) => {
                const target = e.target;

                if (target instanceof HTMLAnchorElement && target.dataset.section != undefined) {
                    e.preventDefault();
                    RenderMainContent(this.root, mainContentElement, config.menu[target.dataset.section]);
                }
            });
        }
        else {
            const mainContentElement = document.createElement('main');
            mainContentElement.classList.add('main');
            this.content.appendChild(mainContentElement);
            const signinPage = new SigninView(mainContentElement);
            signinPage.render();
            // const signupPage = new SignupView(mainContentElement);
            // signupPage.render();
        }


        this.footer.render()
    }
};

export default App;