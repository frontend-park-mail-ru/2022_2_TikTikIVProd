export default class Menu {
    private data: any;
    private parent: any;

    constructor(parent) {
        this.parent = parent;
    }

    get items() {
        return this.data;
    }

    set items(value) {
        this.data = Object.entries(value);
    }

    render() {
        this.items.map(([key, { href, name }], index) => {
            const menuElement = document.createElement('a');
            menuElement.href = href;
            menuElement.textContent = name;
            menuElement.dataset.section = key;
            menuElement.classList.add('menu__item');

            if (index === 0) {
                menuElement.classList.add('active');
            }

            return menuElement;
        })
            .forEach((a) => {
                this.parent.appendChild(a);
            });
    }
}