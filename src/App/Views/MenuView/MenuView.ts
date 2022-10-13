import IView from "../IView/IView.js";
import menuConfig from "./MenuViewConfig.js"

export default class MenuView extends IView {
    private menuTemplate;
    private menu: HTMLElement;
    private currentActiveItem: string | null;

    constructor(parent: HTMLElement) {
        super(parent);
        this.menuTemplate = Handlebars.compile(source);

        const parser = new DOMParser();

        const menu: HTMLElement | null = parser.parseFromString(this.menuTemplate(menuConfig), 'text/html').querySelector('.menu-container');
        if (menu === null) {
            throw Error();
        }
        this.menu = menu;
        this.currentActiveItem = null;
    }

    public render(currentItem?: string) {
        this.parent.innerHTML = '';
        this.parent.appendChild(this.menu);
        if (currentItem !== undefined) {
            this.changeActiveMenuItem(currentItem);
        }
    }

    private changeActiveMenuItem(newActiveItem: string) {
        this.menu.querySelector(`[href="${this.currentActiveItem}"]`)?.classList.remove('menu__item--active');
        this.currentActiveItem = newActiveItem;
        this.menu.querySelector(`[href="${newActiveItem}"]`)?.classList.add('menu__item--active');
    }

    public bindRedirect(callback: Function): void {
        menuConfig.items.forEach((item) => {
            const elem = <HTMLElement>this.menu.querySelector('#' + item.id);
            if (elem !== null) {
                elem.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = (<HTMLAnchorElement>e.target).getAttribute('href');
                    this.changeActiveMenuItem(href || '');
                    callback(href);
                });
            }
        });
    }
}

const source = `
<div class="menu-container">
    <div class="menu__title">
        {{title}}
    </div>
    <div class="menu__items__container">
        {{#each items as |item|}}
        <div id="{{item.id}}" href="{{item.href}}" class="menu__item {{#if item.style }} {{item.style}} {{/if}}">
            {{item.text}}
        </div>
        {{/each}}
    </div>
</div>
`;

