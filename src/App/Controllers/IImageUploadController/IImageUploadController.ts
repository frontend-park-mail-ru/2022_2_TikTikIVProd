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
            console.log('onchange');
            
            const imgs = this.virtInput.files;
            if (imgs) {
                const key: string = URL.createObjectURL(imgs[0]);
                this.imgsStore.set(key, { file: imgs[0], uploaded: false });
                this.loadImagePreview(key);
                if (this.autoUpload) {
                    console.log('auto upload');
                    this.uploadImage(key);
                }
            }
        }
    }

    public uploadImage(url: string) {
        const img = this.imgsStore.get(url);
        if (!img) {
            console.log('No img ', url);
            return;
        }

        if (img.uploaded) {
            return;
        }


        // let dt  = new DataTransfer();
        // dt.items.add(img.file);
        // let file_list = dt.files;
        // const inpt = document.createElement('input');
        // inpt.type = 'file';
        // inpt.files = dt.files;

        const data = new FormData();
        data.append('image', img.file);
        console.log(data);
        
        this.model.uploadImage(data)
            .then(({id}) => {
                img.uploaded = true;
                this.onSucceccUpload(id.toString());
            })
            .catch(err => {
                console.log(err);
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

// import ImageUploadModel from
// '../../Models/ImageUploadModel/ImageUploadModel'; import IController from
// '../IController/IController'; import IImageUploadView from
// '../../Views/IImageUploadView/IImageUploadView';

// class ImageUploadController<tView extends IImageUploadView> extends
// IController<tView, ImageUploadModel> {
//     private virtInput: HTMLInputElement;
//     private localURL: string | undefined;
//     private img: Blob | undefined;

//     constructor(view: tView, model: ImageUploadModel) {
//         super(view, model);

//         this.virtInput = document.createElement('input');
//         this.virtInput.type = 'file';
//         this.virtInput.accept = 'image/*';
//         this.virtInput.onchange = () => {
//             const imgs = this.virtInput.files;
//             if (imgs) {
//                 this.free();
//                 this.img = imgs[0];
//                 this.localURL = URL.createObjectURL(this.img);

//                 this.view.showPreview(this.localURL);
//                 this.view.hideMock();
//             }
//         }

//         this.view.bindClick(this.handleClick.bind(this));
//     }

//     public free(): void {
//         if (this.localURL) {
//             URL.revokeObjectURL(this.localURL);
//             this.localURL = undefined;
//         }
//         if (this.img) {
//             this.img = undefined;
//         }
//     }


//     public uploadImage() {
//         if (!this.localURL || !this.img) {
//             return;// Promise.reject();
//         }

//         const data = new FormData();
//         data.append("image", this.img);

//         this.model.uploadImage(data)
//             .then(() => {
//                 this.free();

//                 this.view.showPreview(this.localURL);
//                 this.view.hideMock();


//                 // return Promise.resolve();
//             })
//             .catch(data => {
//                 console.log(data);


//                 this.view.hidePreview(this.localURL);
//                 this.view.showMock();
//                 // return Promise.reject();
//             });
//     }

//     public clearImage() : void {
//         this.free();
//         this.view.hidePreview(this.localURL);
//         this.view.showMock();
//     }

//     private handleClick(e: Event): void {
//         const action =
//         (<HTMLElement>(<HTMLElement>e.target).closest('[data-action]')).dataset['action'];
//         switch (action) {
//             default: {
//                 return;
//             }
//             case 'choose': {
//                 this.virtInput.dispatchEvent(new MouseEvent('click'));
//                 return;
//             }
//             case 'upload': {
//                 this.uploadImage();
//             }
//             case 'clear': {
//                 this.clearImage();
//             }
//         }
//     }
// }

// export default ImageUploadController;