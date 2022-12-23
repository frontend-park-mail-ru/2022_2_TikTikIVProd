import ImageUploadModel, { IImage } from '../../Models/ImageModel/ImageModel';
import IView from '../../Views/IView/IView';
import IController from '../IController/IController';

abstract class IImageUploadController<tView extends IView> extends IController<tView, ImageUploadModel> {
    private imgsStore: Map<string, { file: File, uploaded: boolean }>; //{img: File, url: string}[];
    private virtInput: HTMLInputElement;
    private autoUpload: boolean;

    constructor(view: tView, model: ImageUploadModel, autoUpload: boolean = false) {
        super(view, model);

        this.autoUpload = autoUpload;
        this.imgsStore = new Map<string, { file: File, uploaded: boolean }>();
        this.virtInput = document.createElement('input');

        this.virtInput.type = 'file';
        this.virtInput.accept = 'image/*';
        this.virtInput.onchange = () => {
            // console.log('onchange');

            const imgs = this.virtInput.files;
            if (imgs) {
                const key: string = URL.createObjectURL(imgs[0]);
                this.imgsStore.set(key, { file: imgs[0], uploaded: false });
                this.loadImagePreview(key);
                if (this.autoUpload) {
                    this.uploadImage(key);
                }
            }
        }
    }

    public async uploadAll() {
        const imgs: IImage[] = [];

        for (const url of this.imgsStore.keys()) {
            console.log('att to upload: ', url);
            
            const img = await this.uploadImage(url);
            
            if(!img) return Promise.reject();
            console.log('att succ');

            imgs.push(img);
        }

        return Promise.resolve(imgs);
    }

    public async uploadImage(url: string) {
        const localImg = this.imgsStore.get(url);
        console.log('store: ', this.imgsStore);
        
        console.log('target' , localImg);
        
        if (!localImg || localImg.uploaded) return Promise.resolve();

        const fd = new FormData();
        fd.append('Attachment', localImg.file);
        try {
            const remoteImg = await this.model.uploadImage(fd);
            localImg.uploaded = true;
            this.onSucceccUpload(remoteImg);
            return Promise.resolve(remoteImg);
        } catch (err) {
            this.onFailUpload(url);
            return Promise.reject();
        };
    }

    public removeOters(url: string) {
        this.imgsStore.forEach((value, key) => {
            if (key !== url) {
                this.remove(key);
            }
        });
    }

    public remove(url: string) {
        URL.revokeObjectURL(url);

        // changed: also delete in input
        const img = this.imgsStore.get(url);
        if (img && this.virtInput.files) {
            let dt = new DataTransfer();

            // Copy all besides deleted
            for (let i = 0; i <= this.virtInput.files.length - 1; i++)
                if (this.virtInput.files[i] !== img.file) {
                    dt.items.add(this.virtInput.files[i]);
                }
            // Replace
            this.virtInput.files = dt.files;
        }
        // Changed end

        this.imgsStore.delete(url);
        if (this.imgsStore.size === 0) {
            this.loadImageMock();
        }
    }

    public flush(): void {
        this.imgsStore.forEach((value, key) => {
            this.remove(key);
        });
    }

    public openFileDialog(): void {
        this.virtInput.dispatchEvent(new MouseEvent('click'));
    }

    abstract loadImagePreview(url: string): void;
    abstract loadImageMock(): void;
    abstract onSucceccUpload(img: IImage): void;
    abstract onFailUpload(url: string): void;
}

export default IImageUploadController;
