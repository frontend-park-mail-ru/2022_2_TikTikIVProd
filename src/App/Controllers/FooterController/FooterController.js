import IController from "../IController/IController.js";
export default class FooterController extends IController {
    constructor(view) {
        super(view, null);
    }
    // Interface
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
