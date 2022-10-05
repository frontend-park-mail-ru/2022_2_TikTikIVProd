import createDiv from "../BasicComponentsCreators/CreateDiv/CreateDiv.js";
import createLink from "../BasicComponentsCreators/CreateLink/CreateLink.js";
class Header {
    constructor(parent) {
        this.parent = parent;
    }
    setLink(text, href) {
        this.link.innerText = text;
        if (href !== undefined) {
            this.link.setAttribute('href', href);
        }
    }
    render() {
        const headerElement = createDiv({ styles: ['header'] });
        const logo = createLink({ text: 'WS', styles: ['header__logo'] });
        headerElement.appendChild(logo);
        this.link = createLink({ id: 'header__link', styles: ['header__link'], text: this.linkText, href: this.href });
        headerElement.appendChild(this.link);
        this.parent.appendChild(headerElement);
    }
}
export default Header;
