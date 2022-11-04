export default class IComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
}
