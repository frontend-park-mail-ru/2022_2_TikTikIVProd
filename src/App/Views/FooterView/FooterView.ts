import IView from "../IView/IView.ts";
import footerViewConfig from "./FooterViewConfig.ts";

export default class FooterView extends IView {
    private footer: HTMLElement;
    private footerTemplate;

    constructor(parent: HTMLElement) {
        super(parent);
        this.footerTemplate = Handlebars.compile(source);

        const parser = new DOMParser();
        const footer: HTMLElement | null = parser.parseFromString(this.footerTemplate(footerViewConfig), 'text/html').querySelector('.footer__container');
        if (footer === null) {
            throw Error();
        }
        this.footer = footer;
    }

    public show(opts?: any): void {
        this.parent.appendChild(this.footer);
    }

    public hide(opts?: any): void {
        this.parent.removeChild(this.footer);
    }
}

const source = `
<div class="footer__container">
    <img src="{{logo.src}}" class="footer__logo">
    <div class="footer__contacts">
        Contacts:
        {{#each contacts}}
        <a id="{{id}}" href="{{href}}" class="footer__contacts__item">
            <img id="{{icon.id}}" src="{{icon.src}}" class="footer__contacts__item__icon">
        </a>
        {{/each}}
        <div class="footer__company__name">
            {{company.name}}
        </div>
    </div>
</div>
`;