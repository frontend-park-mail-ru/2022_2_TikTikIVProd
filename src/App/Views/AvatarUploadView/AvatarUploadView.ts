import IView from "../IView/IView";

import avatarUploadTemplate from "./AvatarUpload.hbs"
import "./AvatarUpload.scss"

class AvatarUploadView extends IView {
    private mock: HTMLElement;
    public preview: HTMLImageElement;
    private tools: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, avatarUploadTemplate({}), '.avatar-upload__wrapper');
        // console.log(this.element);

        this.mock = <HTMLElement>this.element.querySelector('.avatar-upload-mock');
        this.preview = <HTMLImageElement>this.element.querySelector('.avatar-upload__preview');
        this.tools = <HTMLElement>this.element.querySelector('.avatar-upload__tools');
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public showPreview(src: string): void {
        this.preview.src = src;
        console.log(this.preview.src);
        this.preview.classList.remove('avatar-upload--hide');
        console.log(this.element);
        
    }

    public hidePreview(): void {
        this.preview.classList.add('avatar-upload--hide');
    }

    public showMock(): void {
        this.mock.classList.remove('avatar-upload--hide');
    }

    public hideMock(): void {
        this.mock.classList.add('avatar-upload--hide');
    }

    public showTools(): void {
        this.tools.classList.remove('avatar-upload--hide');
    }

    public hideTools(): void {
        this.tools.classList.add('avatar-upload--hide');
    }
}

export default AvatarUploadView;