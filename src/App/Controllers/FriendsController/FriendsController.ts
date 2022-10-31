import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import FriendsView from "../../Views/FriendsView/FriendsView";
import IController from "../IController/IController";

class FriendsController extends IController<FriendsView, null> {
    constructor(view: FriendsView) {
        super(view, null);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }

    private handleClick(e : Event) : void{
        e.preventDefault();
        if(this.isMounted){
            const target = e.target;
        }
    }
}

export default FriendsController; 