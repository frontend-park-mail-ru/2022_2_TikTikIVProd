import config from "../../configs/config.js";
import createDiv from "../BasicComponentsCreators/CreateDiv/CreateDiv.js";
import createLink from "../BasicComponentsCreators/CreateLink/CreateLink.js";
import IComponent from "../IComponent/IComponent.js";
export default class Menu extends IComponent {
    constructor(parent) {
        super(parent);
    }
    remove() {
        this.parent.innerHTML = '';
    }
    changeActiveLink(index) {
        var _a, _b;
        (_a = document.getElementById("menu__item_" + String(this.activeLinkId))) === null || _a === void 0 ? void 0 : _a.classList.remove('menu__active__link');
        this.activeLinkId = index;
        (_b = document.getElementById("menu__item_" + String(this.activeLinkId))) === null || _b === void 0 ? void 0 : _b.classList.add('menu__active__link');
    }
    render() {
        const m = createDiv({ styles: ['aside'] });
        const items = Object.entries(config.menu);
        items.map(([key, { href, name, style }], index) => {
            const menuElement = createLink({
                id: "menu__item_" + String(index),
                href: href,
                text: name,
                styles: ['menu__item', style]
            });
            menuElement.dataset.section = key;
            if (index === 0) {
                menuElement.classList.add('menu__active__link');
                this.activeLinkId = index;
            }
            return menuElement;
        })
            .forEach((a) => {
            m.appendChild(a);
        });
        this.parent.appendChild(m);
    }
}
