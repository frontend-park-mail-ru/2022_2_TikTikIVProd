import createDiv from "../BasicComponentsCreators/CreateDiv/CreateDiv.js";
import createLink from "../BasicComponentsCreators/CreateLink/CreateLink.js";
import createImg from "../BasicComponentsCreators/CreateImg/CreateImg.js";
import createText from "../BasicComponentsCreators/CreateText/CreateText.js";
import paths from "../../Router/RouterPaths.js";
import createButton from "../BasicComponentsCreators/CreateButton/CreateButton.js";
import router from "../../Router/Router.js";
class Header {
    constructor(parent) {
        this.parent = parent;
    }
    render() {
        const headerElement = createDiv({ styles: ['header'] });
        const logo = createLink({ text: 'WS', styles: ['header__logo'] });
        headerElement.appendChild(logo);
        this.link = createDiv({ id: 'header__item', styles: ['header__item'], text: '' });
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
        this.link.innerHTML = '';
        this.renderButtonItem('Зарегистрироваться', paths.signupPage);
    }
    setSigninButton() {
        this.link.innerHTML = '';
        this.renderButtonItem('Войти', paths.signinPage);
    }
    setProfile(user) {
        if (user === null) {
            return;
        }
        this.link.innerHTML = '';
        this.renderProfileItem(user);
    }
    renderProfileItem(user) {
        const profile = createLink({ event: { eventType: 'click', callback: () => { router.goToPath(paths.profile); } }, styles: ['header__profile'] });
        const avatar = createImg({ src: '../src/img/avatar_pavel.jpg', styles: ['header__profile__avatar'] });
        const name = createText({ text: user.first_name, styles: ['header__profile__name'] });
        profile.appendChild(avatar);
        profile.appendChild(name);
        const settings = createLink({ href: paths.profile, styles: ['header__profile__settings'] });
        const icon = createImg({ src: '../src/img/settings_icon.svg', styles: ['header__profile__settings__icon'] });
        settings.appendChild(icon);
        this.link.appendChild(profile);
        this.link.appendChild(settings);
    }
    renderButtonItem(text, path) {
        //TODO убраь callback мб
        this.link.appendChild(createButton({
            id: 'header__link__profile',
            text: text,
            styles: ['header_button'],
            event: {
                eventType: 'click',
                callback: (e) => {
                    e.preventDefault();
                    router.goToPath(path);
                }
            }
        }));
    }
}
export default Header;
