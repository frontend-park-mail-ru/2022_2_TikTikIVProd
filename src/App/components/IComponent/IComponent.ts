export default abstract class IComponent {
    parent: HTMLElement;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }
    abstract render(): void;

    // TODO: Более умный 
    unmount(): void {
        this.parent.innerHTML = '';
    }
}
