export default class IController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.isMounted = false;
    }
}
