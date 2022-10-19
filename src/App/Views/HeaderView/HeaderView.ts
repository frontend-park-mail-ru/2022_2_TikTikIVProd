import headerTemplate from "./HeaderView.hbs"
import IView from "../IView/IView";
import headerItems from "./HeaderViewConfig";

export default class HeaderView extends IView {
    private header: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);

        const parser = new DOMParser();
        const header: HTMLElement | null = parser.parseFromString(headerTemplate({}), 'text/html').querySelector('.header__container');
        if (header === null) {
            throw Error();
        }
        this.header = header;
    }

    public show(opts?: any): void {
        this.parent.appendChild(this.header);
    }

    public hide(opts?: any): void {
        this.parent.removeChild(this.header);
    }

    public bindClickEvent(listener: any): void {
        this.header.addEventListener('click', listener.bind(this));
    }

    public unbindClickEvent(listener: any) {
        this.header.removeEventListener('click', listener.bind(this));
    }


    public changeHeaderItem(itemName: string, data?: any): void {
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
