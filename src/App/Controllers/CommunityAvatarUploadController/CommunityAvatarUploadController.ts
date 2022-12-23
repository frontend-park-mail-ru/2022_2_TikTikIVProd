import CommunityModel, { ICommunityEditData } from "../../Models/CommunityModel/CommunityModel";
import ImageUploadModel, { IImage } from "../../Models/ImageModel/ImageModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import AvatarUploadView from "../../Views/AvatarUploadView/AvatarUploadView";
import IImageUploadController from "../IImageUploadController/IImageUploadController";

class CommunityAvatarUploadController extends IImageUploadController<AvatarUploadView> {
    private commModel: CommunityModel;
    private commId: number;

    constructor(model: CommunityModel) {
        super(new AvatarUploadView(), new ImageUploadModel());
        this.commModel = model;
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }

    public setCommunityId(communityId: string | number): void {
        this.commId = Number(communityId);
    }

    public getElement(): HTMLElement {
        return this.view.getElement();
    }

    public handleClick(e: Event): void {
        const target = <HTMLElement>e.target;
        const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
        const src = (<HTMLImageElement>target.closest('.avatar-upload')?.querySelector('.avatar-upload__preview'))?.src;

        switch (action) {
            default: return;
            case 'choose': {
                this.openFileDialog();
                return;
            }
            case 'upload': {
                if (!src) {
                    return;
                }
                this.uploadImage(src);
                return;
            }
            case 'clear': {
                this.flush();
                this.view.hidePreview();
                this.view.hideTools();
                this.view.showMock();
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

    public onSucceccUpload(remoteImg: IImage): void {
        const data: ICommunityEditData = {
            avatar_id: Number(remoteImg.id),
            id: this.commId,
        };

        this.commModel.edit(data)
            .then(() => {
                this.loadImageMock();
                this.flush();
                EventDispatcher.emit('community_avatar_changed');
            })
            .catch((data) => {
            });
    }

    public onFailUpload(url: string): void {
    }
}

export default CommunityAvatarUploadController;