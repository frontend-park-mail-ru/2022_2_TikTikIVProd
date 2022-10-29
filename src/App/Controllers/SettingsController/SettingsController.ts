import { IFeedData } from "../../Models/FeedModel/FeedModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
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

        const data = this.view.getDataFromGroup(target);
        const isValidData = this.validateData(data);
        // TODO update in model
    }

    public validateData(data: Map<string, string>) : boolean { 
        let isFormValid = true;
        data.forEach((value, key) => {
            let ref: string | undefined = undefined;
            if(key === 'repeat_password'){
                ref = data.get('password');
            }

            const { isValid, msg } = validateInput(key, value, ref);
            if (!isValid) {
                isFormValid = false;
                this.view.showErrorMsg(key, msg);
                return;
            }
            this.view.hideErrorMsg(key, msg);
        });
        return isFormValid;
    }
}

export default SettingsController;