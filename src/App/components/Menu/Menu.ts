import config from "../../configs/config.js";
import createDiv from "../BasicComponentsCreators/CreateDiv/CreateDiv.js";
import createLink from "../BasicComponentsCreators/CreateLink/CreateLink.js";
import IComponent from "../IComponent/IComponent.js";

export default class Menu extends IComponent {

    private activeLinkId: number;

    constructor(parent: HTMLElement) {
        super(parent);
    }

    remove() {
        this.parent.innerHTML = '';
    }

    changeActiveLink(index: number) {
        document.getElementById("menu__item_" + String(this.activeLinkId))?.classList.remove('menu__active__link');
        this.activeLinkId = index;
        document.getElementById("menu__item_" + String(this.activeLinkId))?.classList.add('menu__active__link');
    }

    render() {
        const m = createDiv({ styles: ['aside'] });
        const items = Object.entries(config.menu);
        items.map(([key, { href, name, style }]: any, index: number) => {
            const menuElement = createLink({
                id: "menu__item_" + String(index),
                href: href,
                text: name,
                styles: ['menu__item', style]
            })
            menuElement.dataset.section = key;

            if (index === 0) {
                menuElement.classList.add('menu__active__link');
                this.activeLinkId = index;
            }

            return menuElement;
        })
            .forEach((a: any) => {
                m.appendChild(a);
            });

        this.parent.appendChild(m);
    }
}