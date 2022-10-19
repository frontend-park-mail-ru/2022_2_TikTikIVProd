import IView from "../IView/IView";
import menuConfig from "./MenuViewConfig"
import menuTemplate from "./MenuView.hbs"

export default class MenuView extends IView {
    private menu: HTMLElement;
    private currentActiveItem: string | null;

    constructor(parent: HTMLElement) {
        super(parent);

        const parser = new DOMParser();

        const menu: HTMLElement | null = parser.parseFromString(menuTemplate(menuConfig), 'text/html').querySelector('.menu-container');
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

