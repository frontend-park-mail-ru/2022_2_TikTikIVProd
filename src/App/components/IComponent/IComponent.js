export default class IComponent {
    constructor(parent) {
        this.parent = parent;
    }
    // TODO: Более умный 
    unmount() {
        this.parent.innerHTML = '';
    }
}
