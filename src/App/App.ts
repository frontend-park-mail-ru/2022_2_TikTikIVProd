import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import renderFeed from './components/Feed/Feed.js';
import FooterView from './components/FooterView/FooterView.js';
import RenderMainContent from './utils/RenderMainContent.js';
import config from './configs/config.js'

// /feed
// /signin
// /signup

class App {
    private root: HTMLElement;
    constructor() {
        const root = document.getElementById('root');
        if (root === null) {
            throw new Error("No root element");
        }
        this.root = root;
    }

    run(): void {
        const header = new Header(this.root);
        header.render();


        const menuElement = document.createElement('aside');
        menuElement.classList.add('menu');
        this.root.appendChild(menuElement);
        const menu = new Menu(menuElement);
        menu.items = config.menu;
        menu.render();


        const mainContentElement = document.createElement('main');
        this.root.appendChild(mainContentElement);
        mainContentElement.appendChild(renderFeed());

        const footer = new FooterView(this.root);
        footer.render()

        this.root.addEventListener('click', (e) => {
            const target = e.target;

            if (target instanceof HTMLAnchorElement && target.dataset.section != undefined) {
                e.preventDefault();
                RenderMainContent(this.root, mainContentElement, config.menu[target.dataset.section]);
            }
        });
    }
};

export default App;