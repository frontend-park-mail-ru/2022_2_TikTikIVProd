import IView from '../../Views/IView/IView.js'
import IModel from '../../Models/IModel/IModel.js'

//extends IModel

export default abstract class IController<tView extends IView, tModel> {
    protected view: tView;
    protected model: tModel;

    protected isMounted: boolean;

    constructor(view: tView, model: tModel) {
        this.view = view;
        this.model = model;
        this.isMounted = false;
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;
        }
    }
}