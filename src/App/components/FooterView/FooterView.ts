import IComponent from '../IComponent/IComponent.js';

import createDiv from '../BasicComponentsCreators/CreateDiv/CreateDiv.js';
import createLink from '../BasicComponentsCreators/CreateLink/CreateLink.js';
import createImg from '../BasicComponentsCreators/CreateImg/CreateImg.js';

export default class FooterView extends IComponent {
    constructor(parent: HTMLElement) {
        super(parent);
    }

    render() {
        const footer = createDiv({ styles: ['footer'] });

        const content = createDiv({ styles: ['footer__container'] });
        const logo = createImg({ src: '../src/img/footer_logo.png', styles: ['footer__logo'] });

        const contacts = createDiv({ text: 'Contacts:', styles: ['contacts'] });

        const tgContact = createLink({ href: 'https://t.me/george007361', styles: ['contacts__item'] });
        const tgContactLogo = createImg({ src: '../src/img/tg_icon.png', styles: ['contacts__item__icon'] });
        tgContact.appendChild(tgContactLogo);

        contacts.appendChild(tgContact);

        const companyName = createDiv({ text: 'TikTikAndVProd2022', styles: ['company-name'] });

        content.appendChild(logo);
        content.appendChild(contacts);
        content.appendChild(companyName);

        footer.appendChild(content);

        this.parent.appendChild(footer);
    }
}