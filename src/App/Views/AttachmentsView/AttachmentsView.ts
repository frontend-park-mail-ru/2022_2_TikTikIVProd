import IView from "../IView/IView";

import attachmentUploadFieldTemplate from "./AttachmentsView.hbs"
import "./AttachmentsView.scss"

import attachmentTemplate from "../../Components/Attachment/Attachment.hbs"
import "../../Components/Attachment/Attachment.scss"

class AttachmentsView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, attachmentUploadFieldTemplate({}), '.attachments-container');
    }

    public bindClick(callback: Function) {
        this.element.addEventListener('click', callback.bind(this));
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public removePreview(src: string, target?: HTMLElement): void {
        let preview = null;
        if (target) {
            preview = target.closest(`.attachment[data-attachment_src="${src}"]`);
        } else {
            preview = this.element.querySelector(`.attachment[data-attachment_src="${src}"]`);
        }

        console.log(preview);
        if (!preview) return;

        this.element.removeChild(preview);
    }

    public addPreview(src: string): void {
        this.element.innerHTML += attachmentTemplate({ src: src });
    }

    public clear() : void {
        this.element.innerHTML = '';
    }

}

export default AttachmentsView;