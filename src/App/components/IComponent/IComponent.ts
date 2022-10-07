export default abstract class IComponent {
    protected parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract render(): void;
    public getParent(): HTMLElement {
        return this.parent;
    }
}
