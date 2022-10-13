export default class IController<tView, tModel>{
    protected view: tView;
    protected model: tModel;

    constructor(view: tView, model: tModel) {
        this.view = view;
        this.model = model;
    }
}