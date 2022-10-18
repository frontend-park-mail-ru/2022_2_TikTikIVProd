import FooterView from "../../Views/FooterView/FooterView.ts";
import IController from "../IController/IController.ts";

export default class FooterController extends IController<FooterView, null> {
    constructor(view: FooterView) {
        super(view, null);
    }

    // Interface
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