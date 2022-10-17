import IView from "../IView/IView.js";
import headerItems from "./HeaderViewConfig.js";
export default class HeaderView extends IView {
    constructor(parent) {
        super(parent);
        this.headerTemplate = Handlebars.compile(source);
        const parser = new DOMParser();
        const header = parser.parseFromString(this.headerTemplate({}), 'text/html').querySelector('.header__container');
        if (header === null) {
            throw Error();
        }
        this.header = header;
    }
    show(opts) {
        this.parent.appendChild(this.header);
    }
    hide(opts) {
        this.parent.removeChild(this.header);
    }
    bindClickEvent(listener) {
        this.header.addEventListener('click', listener.bind(this));
    }
    unbindClickEvent(listener) {
        this.header.removeEventListener('click', listener.bind(this));
    }
    changeHeaderItem(itemName, data) {
        const headerItem = this.header.querySelector('#header__item');
        if (headerItem === null) {
            console.log('Header: no header item');
            return;
        }
        const elem = headerItems.get(itemName);
        if (elem === undefined) {
            return;
        }
        headerItem.innerHTML = elem.render(Object.assign(elem.data, data));
    }
}
const source = `
<div class="header__container">
    <div class="header__logo" href='/feed'>
        WS
    </div>
    <div id="header__item" class="header__item">{{item}}</div>
</div>
`;
