import IView from "../IView/IView.ts";
import menuConfig from "./MenuViewConfig.ts"

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

    public show(opts?: any): void {
        this.parent.appendChild(this.menu);
        // if (opts.currentItem !== undefined) {
        //     this.changeActiveMenuItem(opts.currentItem);
        // }
    }

    public hide(opts?: any): void {
        this.parent.removeChild(this.menu);
    }

    public changeActiveMenuItem(newActiveItem: string) {
        this.menu.querySelector(`[href="${this.currentActiveItem}"]`)?.classList.remove('menu__item--active');
        this.currentActiveItem = newActiveItem;
        this.menu.querySelector(`[href="${newActiveItem}"]`)?.classList.add('menu__item--active');
    }

    public bindRedirect(listener: any): void {
        this.menu.addEventListener('click', listener);
    }

    public unbindRedirect(listener: any): void {
        this.menu.removeEventListener('click', listener);
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

