import IView from "../IView/IView";

import avatarUploadTemplate from "./AvatarUpload.hbs"
import "./AvatarUpload.scss"

class AvatarUploadView extends IView {
    private mock: HTMLElement;
    public preview: HTMLImageElement;
    private tools: HTMLElement;

    constructor() {
        super(document.createElement('template'), avatarUploadTemplate({}), '.avatar-upload__wrapper');
        this.mock = <HTMLElement>this.element.querySelector('.avatar-upload-mock');
        this.preview = <HTMLImageElement>this.element.querySelector('.avatar-upload__preview');
        this.tools = <HTMLElement>this.element.querySelector('.avatar-upload__tools');
    }

    public getElement() : HTMLElement {
        return this.element;
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public showPreview(src: string): void {
        this.preview.src = src;
        // console.log(this.preview.src);
        this.preview.classList.remove('avatar-upload--hide');
        // console.log(this.element);
        
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