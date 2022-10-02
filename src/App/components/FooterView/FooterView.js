import IComponent from '../IComponent/IComponent.js';
import createDiv from '../Basics/CreateDiv/CreateDiv.js';
import createLink from '../Basics/CreateLink/CreateLink.js';
import createImg from '../Basics/CreateImg/CreateImg.js';
import createText from '../Basics/CreateText/CreateText.js';
export default class FooterView extends IComponent {
    constructor(parent) {
        super(parent);
    }
    render() {
        const footer = createDiv({ styles: ['footer'] });
        const content = createDiv({ styles: ['footer__container'] });
        const logo = createImg({ src: '#', styles: ['logo--company'] });
        const contacts = createDiv({ text: 'Contacts:', styles: ['contacts'] })
            .appendChildren(createLink({ href: 'https://t.me/george007361', styles: ['contacts--item'] })
            .appendChildren(createImg({ src: '#', styles: ['contacts__item__icon'] }), createText({ text: '@George007361' })));
        const description = createDiv({ text: '«WS» позволяет пользователям отправлять друг другу сообщения, делиться новостями и многое другое...', styles: ['description'] });
        content.appendChildren(logo, contacts, description);
        const companyName = createDiv({ text: 'TikTikAndVProd2022', styles: ['footer__container', 'company-name'] });
        footer.appendChildren(content, companyName);
        this.parent.appendChild(footer);
    }
}
