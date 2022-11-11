import ImageUploadModel from "../../Models/ImageUploadModel/ImageUploadModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import AvatarUploadView from "../../Views/AvatarUploadView/AvatarUploadView";
import IImageUploadController from "../IImageUploadController/IImageUploadController";

class AvatarUploadController extends IImageUploadController<AvatarUploadView> {
    private userModel : UserModel;

    constructor(view: AvatarUploadView, models: {images: ImageUploadModel, user: UserModel}) {
        super(view, models.images);
        this.userModel = models.user;
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }

    public handleClick(e: Event): void {
        const target = <HTMLElement>e.target;
        const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
        const src = (<HTMLImageElement>target.closest('.avatar-upload')?.querySelector('.avatar-upload__preview'))?.src;

        console.log(src);
        switch (action) {
            default: return;
            case 'choose': {
                this.openFileDialog();
                return;
            }
            case 'upload': {
                if (!src) {
                    console.log('no src');
                    return;
                }
                this.uploadImage(src);
                return;
            }
        }

    }

    public loadImagePreview(url: string): void {
        this.view.hideMock();
        this.view.showPreview(url);
        this.view.showTools();
        this.removeOters(url);
    }

    public loadImageMock(): void {
        this.view.hidePreview();
        this.view.showMock();
        this.view.hideTools();
    }

    public onSucceccUpload(avatarRemoveId: string): void {
        console.log('succ');
        this.userModel.updateUserData({avatar: Number(avatarRemoveId)})
        .then(() => {
            console.log('user updated');
            this.loadImageMock();
        })
        .catch((data)=>{
            console.log(data);
            console.log('user not upd');
        });
    }

    public onFailUpload(url: string): void {
        console.log('fail');
    }
}

export default AvatarUploadController;