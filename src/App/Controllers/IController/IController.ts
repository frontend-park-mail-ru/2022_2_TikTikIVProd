export default abstract class IController<tView, tModel>{
    protected view: tView;
    protected model: tModel;

    protected isMounted: boolean;
    constructor(view: tView, model: tModel) {
        this.view = view;
        this.model = model;
        this.isMounted = false;
    }

    abstract mountComponent(): void;
    abstract unmountComponent(): void;
}