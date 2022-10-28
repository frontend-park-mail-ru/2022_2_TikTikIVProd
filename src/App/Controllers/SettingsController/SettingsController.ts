import { IFeedData } from "../../Models/FeedModel/FeedModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import SettingsView from "../../Views/SettingsView/SettingsView";
import IController from "../IController/IController";

class SettingsController extends IController<SettingsView, UserModel> {
    constructor(view: SettingsView, model: UserModel) {
        super(view, model);
        this.view.bindClick(this.handleClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            const user = this.model.getCurrentUser();
            if (!user) {
                console.log('Settings contr error no user');
                return;
            }
            this.view.show(user);
            this.isMounted = true;
        }
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        const target = <HTMLElement>e.target;
        if ((<HTMLButtonElement>target).type !== 'submit') {
            return;
        }

        const groupElem = target.closest('.group');
        if (!groupElem) {
            return;
        }

        const data = new Map;

        groupElem.querySelectorAll('input').forEach((item) => {
            data.set(item.id, item.value);
        });

        console.log(data);

    }
}

export default SettingsController;