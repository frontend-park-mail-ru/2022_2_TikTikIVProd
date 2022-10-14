import headerButtonTemplate from "../../Components/HeaderButton/HeaderButton.js";
import headerProfileTemplate from "../../Components/HeaderProfile/HeaderProfile.js";
import IView from "../IView/IView.js";

export default class HeaderView extends IView {
    private headerTemplate;
    private header: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        this.headerTemplate = Handlebars.compile(source);

        const parser = new DOMParser();
        const header: HTMLElement | null = parser.parseFromString(this.headerTemplate({}), 'text/html').querySelector('.header__container');
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


const source = `
<div class="header__container">
    <div class="header__logo" href='/feed'>
        WS
    </div>
    <div id="header__item" class="header__item">{{item}}</div>
</div>
`;
