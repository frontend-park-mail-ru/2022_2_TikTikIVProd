import IView from "../IView/IView.js";
import menuConfig from "./MenuViewConfig.js";
export default class MenuView extends IView {
    constructor(parent) {
        super(parent);
        this.menuTemplate = Handlebars.compile(source);
        const parser = new DOMParser();
        const menu = parser.parseFromString(this.menuTemplate(menuConfig), 'text/html').querySelector('.menu-container');
        if (menu === null) {
            throw Error();
        }
        this.menu = menu;
        this.currentActiveItem = null;
    }
    show(opts) {
        this.parent.appendChild(this.menu);
        // if (opts.currentItem !== undefined) {
        //     this.changeActiveMenuItem(opts.currentItem);
        // }
    }
    hide(opts) {
        this.parent.removeChild(this.menu);
    }
    changeActiveMenuItem(newActiveItem) {
        var _a, _b;
        (_a = this.menu.querySelector(`[href="${this.currentActiveItem}"]`)) === null || _a === void 0 ? void 0 : _a.classList.remove('menu__item--active');
        this.currentActiveItem = newActiveItem;
        (_b = this.menu.querySelector(`[href="${newActiveItem}"]`)) === null || _b === void 0 ? void 0 : _b.classList.add('menu__item--active');
    }
    bindRedirect(listener) {
        this.menu.addEventListener('click', listener);
    }
    unbindRedirect(listener) {
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
