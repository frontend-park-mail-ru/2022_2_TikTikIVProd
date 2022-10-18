import IView from "../IView/IView.ts";
import footerViewConfig from "./FooterViewConfig.ts";
import footerTemplate from "./FooterView.hbs"

export default class FooterView extends IView {
    private footer: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        const parser = new DOMParser();
        const footer: HTMLElement | null = parser.parseFromString(footerTemplate(footerViewConfig), 'text/html').querySelector('.footer__container');
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