export default abstract class IView {
    protected parent: HTMLElement;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract show(opts?: any): void;
    abstract hide(opts?: any): void;
}