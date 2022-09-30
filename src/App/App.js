import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';
import renderFeed from './components/Feed/Feed.js';
import renderProfile from './components/Profile/Profile.js';
const config = {
    menu: {
        main: {
            href: '/main',
            name: 'Лента',
            render: renderFeed,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            // render: renderLogin,
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            // render: renderSignup,
        },
        profile: {
            href: '/profile',
            name: 'Профиль',
            render: renderProfile,
        },
    },
};
function App() {
    const root = document.getElementById('root');
    const header = new Header(root);
    header.render();
    const menuElement = document.createElement('aside');
    menuElement.classList.add('menu');
    root === null || root === void 0 ? void 0 : root.appendChild(menuElement);
    const menu = new Menu(menuElement);
    menu.items = config.menu;
    menu.render();
    const mainContentElement = document.createElement('main');
    root === null || root === void 0 ? void 0 : root.appendChild(mainContentElement);
    mainContentElement.appendChild(renderFeed());
    function goToPage(menuElement) {
        var _a, _b;
        mainContentElement.innerHTML = '';
        (_a = root === null || root === void 0 ? void 0 : root.querySelector('.active')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        (_b = root === null || root === void 0 ? void 0 : root.querySelector(`[data-section=${menuElement.href.slice(1)}]`)) === null || _b === void 0 ? void 0 : _b.classList.add('active');
        mainContentElement.appendChild(menuElement.render());
    }
    root === null || root === void 0 ? void 0 : root.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof HTMLAnchorElement && target.dataset.section != undefined) {
            e.preventDefault();
            goToPage(config.menu[target.dataset.section]);
        }
    });
}
;
export default App;
