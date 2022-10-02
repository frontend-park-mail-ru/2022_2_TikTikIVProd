abstract class IComponent {
    parent : HTMLElement;
    constructor(parent : HTMLElement)
    {
        this.parent = parent;
    }
    abstract render() : void;
}

export default IComponent;