import IComponent from '../IComponent/IComponent.js';
import { createDiv, createImg, createLink, createText } from '../Basics/Basics.js';
export default class FooterView extends IComponent {
    // private onSubmitForm() ;
    constructor(parent) {
        super(parent);
    }
    render() {
        const footer = createDiv({ styles: ['footer'] });
        const content = createDiv({ styles: ['footer-container'] });
        const logo = createImg({ src: '#', styles: ['logo--medium'] });
        const contacts = createDiv({ text: 'Contacts:', styles: ['contacts'] })
            .appendChildren(createLink({ href: 'https://t.me/george007361', styles: ['contacts--item'] })
            .appendChildren(createImg({ src: '#', styles: ['icon'] }), createText({ text: '@George007361' })));
        const description = createDiv({ text: '«WS» позволяет пользователям отправлять друг другу сообщения, делиться новостями и многое другое...', styles: ['description'] });
        content.appendChildren(logo, contacts, description);
        const companyName = createDiv({ text: 'TikTikAndVProd2022', styles: ['footer-container'] });
        footer.appendChildren(content, companyName);
        this.parent.appendChild(footer);
    }
}
