import headerTemplate from "../../Components/Header/Header.js";
import headerButtonTemplate from "../../Components/Header/HeaderButton.js";
import headerProfileTemplate from "../../Components/Header/HeaderProfile.js";
import IView from "../IView/IView.js";

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

    public render(opts?: any): void {
        this.parent.innerHTML = '';
        this.parent.appendChild(this.header);
    }

    public bindClickEvent(callback: Function): void {
        this.header.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHref = (<HTMLLinkElement>e.target).getAttribute('href');
            console.log(targetHref);
            if (targetHref !== null) {
                callback(targetHref);
            }
        });
    }

    public changeHeaderItem(itemName: string): void {
        const headerItem = this.header.querySelector('#header__item');
        if (headerItem === null) {
            console.log('Header: no header item');
            return;
        }
        switch (itemName) {
            case 'signin': {
                headerItem.innerHTML = headerButtonTemplate({ href: '/signin', text: 'Войти' });
                break;
            }
            case 'signup': {
                headerItem.innerHTML = headerButtonTemplate({ href: '/signup', text: 'Зарегистрироваться' });
                break;
            }
            case 'profile': {
                headerItem.innerHTML = headerProfileTemplate({ href: '/profile', name: 'TEst name', avatar: '#' });
                break;
            }
        }
    }
}