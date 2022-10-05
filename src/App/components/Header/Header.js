import createDiv from "../BasicComponentsCreators/CreateDiv/CreateDiv.js";
import createLink from "../BasicComponentsCreators/CreateLink/CreateLink.js";
class Header {
    constructor(parent) {
        this.parent = parent;
    }
    // setLink(text: string, href?: string) {
    //     this.link.innerText = text;
    //     if (href !== undefined) {
    //         this.link.setAttribute('href', href);
    //     }
    // }
    render() {
        const headerElement = createDiv({ styles: ['header'] });
        const logo = createLink({ text: 'WS', styles: ['header__logo'] });
        headerElement.appendChild(logo);
        this.link = createLink({ id: 'header__link', styles: ['header__link'], text: '', href: '' });
        headerElement.appendChild(this.link);
        this.parent.appendChild(headerElement);
    }
    hide() {
        const header = this.parent.querySelector('.header');
        if (header !== undefined) {
            header.style.display = 'none';
        }
    }
    show() {
        const header = this.parent.querySelector('.header');
        if (header !== undefined) {
            header.style.display = 'visible';
        }
    }
    setSignupButton() {
        // TODO
        this.link.innerHTML = '';
        this.link.textContent = 'Кнопка рег';
    }
    setSigninButton() {
        // TODO
        this.link.innerHTML = '';
        this.link.textContent = 'Кнопка авт';
    }
    setProfile(user) {
        // TODO
        if (user === null) {
            return;
        }
        this.link.innerHTML = '';
        this.link.textContent = user.firstName;
    }
}
export default Header;
