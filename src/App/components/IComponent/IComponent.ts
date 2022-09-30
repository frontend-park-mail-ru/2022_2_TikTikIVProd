abstract class IComponent {
    protected parent: HTMLElement;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }
    abstract render(): void;
}

export default IComponent;