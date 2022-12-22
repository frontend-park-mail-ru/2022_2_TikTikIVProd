import ImageUploadModel, { IImage } from "../../Models/ImageModel/ImageModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import IImageUploadController from "../IImageUploadController/IImageUploadController";
import AttachmentsUploadView from "../../Views/AttachmentsUploadView/AttachmentsUploadView"

class AttachmentsUploadController extends IImageUploadController<AttachmentsUploadView> {

    constructor() {
        super(new AttachmentsUploadView(document.createElement('template')), new ImageUploadModel());
        this.view.bindClick(this.handleClick.bind(this));
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        const target = <HTMLElement>e.target;
        const action = target.dataset['action'];
        const src = (<HTMLElement>target.closest('.attachment'))?.dataset['attachment_src'];
        switch (action) {
            default: {
                console.log(action);
                return;
            }
            case 'attachment__remove': {
                if (!src) {
                    console.log('Cant remove, no sc');
                    return;
                }
                this.removeAttachment(src, target);
                return;
            }

            case 'attachment__add': {
                this.addAttachment();
                return;
            }
        }
    }

    public getElement(): HTMLElement {
        return this.view.getElement();
    }

    public addAttachment(): void {
        this.openFileDialog();
    }

    public removeAttachment(src: string, target?: HTMLElement): void {
        this.view.removePreview(src, target);
        this.remove(src);
    }

    public async submitAttachments() {
        const imgs = await this.uploadAll();
        this.view.clear();
        return Promise.resolve(imgs);
    }


    // Inherited
    loadImageMock(): void {
        console.log('mock');
    }

    loadImagePreview(url: string): void {
        console.log('load preview');
        this.view.addPreview(url);
    }

    onFailUpload(url: string): void {
        console.log('cant upl att');
    }

    onSucceccUpload(remoteImg: IImage): void {
        console.log('uploaded');
    }
}

export default AttachmentsUploadController;