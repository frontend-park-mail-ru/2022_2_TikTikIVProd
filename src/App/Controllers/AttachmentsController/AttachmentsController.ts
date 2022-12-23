import ImageUploadModel, { IImage } from "../../Models/ImageModel/ImageModel";
import IImageUploadController from "../IImageUploadController/IImageUploadController";
import AttachmentsView from "../../Views/AttachmentsView/AttachmentsView"

class AttachmentsController extends IImageUploadController<AttachmentsView> {
    private attachmentsStore: Map<string, IImage>
    constructor() {
        super(new AttachmentsView(document.createElement('template')), new ImageUploadModel());
        this.view.bindClick(this.handleClick.bind(this));
        this.attachmentsStore = new Map<string, IImage>;
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        const target = <HTMLElement>e.target;
        const action = target.dataset['action'];
        const src = (<HTMLElement>target.closest('.attachment'))?.dataset['attachment_src'];
        switch (action) {
            default: return;
            case 'attachment__remove': {
                if (!src) {
                    console.log('Cant remove attachment, no scr url');
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

    public loadAttachmentsByID(ids: string[]) {
        this.loadAttachments(ImageUploadModel.parseImages(JSON.stringify(ids)));
    }

    public loadAttachments(imgs: IImage[]) {
        imgs.forEach(img => {
            this.attachmentsStore.set(img.src, img);
            this.view.addPreview(img.src);
        });
    }

    public removeAttachment(src: string, target?: HTMLElement): void {
        this.view.removePreview(src, target);
        if (this.attachmentsStore.has(src)) {
            // For uploaded
            this.attachmentsStore.delete(src);
        } else {
            // For not uploaded
            this.remove(src);
        }
    }

    public async submitAttachments() {
        // Upload new
        let imgs: IImage[] = [...this.attachmentsStore.values()];
        console.log('has imgs: ', imgs);

        try {
            const newImages = await this.uploadAll();
            console.log('all new attachments uploaded');
            this.flush(); // !!!!! Clear blob obj
            imgs = imgs.concat(newImages);
            console.log('has imgs: ', imgs);


        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }

        this.attachmentsStore.clear(); //!!!!
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

export default AttachmentsController;