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

        const phoneContact = createLink({ event: { eventType: 'click', callback: (e) => { } }, href: 'tel:555-555-5555', styles: ['contacts__item'] });
        const phoneContactLogo = createImg({ src: '../src/img/phone_icon.svg', styles: ['contacts__item__icon'] });
        phoneContact.appendChild(phoneContactLogo);

        contacts.appendChild(phoneContact);

        const companyName = createDiv({ text: 'TikTikAndVProd2022', styles: ['company-name'] });

        content.appendChild(logo);
        content.appendChild(contacts);
        content.appendChild(companyName);

        footer.appendChild(content);

        this.parent.appendChild(footer);
    }

    hide(): void {
        const footer = <HTMLElement>this.parent.querySelector('.footer');
        if (footer !== undefined) {
            footer.style.visibility = 'hidden';
        }
    }

    show(): void {
        const footer = <HTMLElement>this.parent.querySelector('.footer');
        if (footer !== undefined) {
            footer.style.display = 'visible';
        }
    }
}