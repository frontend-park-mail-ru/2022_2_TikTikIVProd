//extends IModel
export default class IController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.isMounted = false;
    }
    mountComponent() {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
        }
    }
    unmountComponent() {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;
        }
    }
}
