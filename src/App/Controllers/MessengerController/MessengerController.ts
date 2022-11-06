import MessengerModel from "../../Models/MessengerModel/MessengerModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import MessengerView from "../../Views/MessengerView/MessengerView";
import IController from "../IController/IController";

class MessengerController extends IController<MessengerView, MessengerModel> {
    constructor(view: MessengerView, model: MessengerModel) {
        super(view, model);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }
}

export default MessengerController; 