import IComponent from "../IComponent/IComponent.js";

export default class Menu extends IComponent {
    private data: any;

    constructor(parent: HTMLElement) {
        super(parent);
    }

    get items() {
        return this.data;
    }

    set items(value) {
        this.data = Object.entries(value);
    }

    render() {
        this.items.map(([key, { href, name }]: any, index: number) => {
            const menuElement = document.createElement('a');
            menuElement.href = href;
            menuElement.textContent = name;
            menuElement.dataset.section = key;
            menuElement.classList.add('menu__item');
            menuElement.id = "menu__item_" + String(index);

            if (index === 0) {
                menuElement.classList.add('active');
            }

            return menuElement;
        })
            .forEach((a: any) => {
                this.parent.appendChild(a);
            });
    }
}