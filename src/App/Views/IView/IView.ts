export default abstract class IView {
    protected parent: HTMLElement;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract render(opts: any): void;
}