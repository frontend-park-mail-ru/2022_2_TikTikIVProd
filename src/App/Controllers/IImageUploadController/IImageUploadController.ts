import ImageUploadModel from '../../Models/ImageUploadModel/ImageUploadModel';
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
                    // console.log('auto upload');
                    this.uploadImage(key);
                }
            }
        }
    }

    public uploadImage(url: string) {
        const img = this.imgsStore.get(url);
        if (!img) {
            // console.log('No img ', url);
            return;
        }

        if (img.uploaded) {
            return;
        }

        const data = new FormData();
        data.append('image', img.file);
        // console.log(data);

        this.model.uploadImage(data)
            .then(({ id }) => {
                img.uploaded = true;
                this.onSucceccUpload(id.toString());
            })
            .catch(err => {
                // console.log(err);
                this.onFailUpload(url);
            });
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
                if (this.virtInput.files[i] !== img.file){
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
    abstract onSucceccUpload(url: string): void;
    abstract onFailUpload(url: string): void;
}

export default IImageUploadController;
