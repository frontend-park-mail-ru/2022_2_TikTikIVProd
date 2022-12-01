import config from "../../Configs/Config";
import MessengerModel, { IDialog } from "../../Models/MessengerModel/MessengerModel";
import UserModel, { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import MessengerView from "../../Views/MessengerView/MessengerView";
import IController from "../IController/IController";


export interface IDialogData {
    dialog_id: string;
    user_id: string;
    user_first_name: string;
    user_last_name: string;
    user_avatar: string;
}


class MessengerController extends IController<MessengerView, { user: UserModel, messenger: MessengerModel }> {

    constructor(view: MessengerView, model: { user: UserModel, messenger: MessengerModel }) {
        super(view, model);
        this.view.bindClick(this.handleClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        const target = <HTMLElement>e.target;

        const dialogId = (<HTMLElement>target.closest('.dialog'))?.dataset['dialog_id'];
        const userId = (<HTMLElement>target.closest('.dialog'))?.dataset['user_id'];
        const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];


        if (!userId) {
            // console.log('user null');
            return;
        }
        switch (action) {
            default: return;

            case "open-dialog": {
                let url = Object.assign({}, config.api.chat).url;
                url = url.replace('{:id}', userId.toString());
                router.goToPath(url);
            }
        }
    }


    private async processData(data: IDialog[]) {
        const dialogsData: IDialogData[] = [];
        const currentUser = this.model.user.getCurrentUser();

        if (!currentUser) {
            // console.log('No current user');
            return;
        }

        for (let i = 0; i < data.length; i++) {
            const userId = data[i].userId1 !== currentUser.id ? data[i].userId1 : data[i].userId2;
            const user = await this.model.user.getUser(userId);

            dialogsData.push({
                dialog_id: data[i].dialog_id.toString(),
                user_id: user.id.toString(),
                user_first_name: user.first_name,
                user_last_name: user.last_name,
                user_avatar: user.avatar,
            });
        }

        return Promise.resolve(dialogsData);
    }

    public async updateDialogs() {
        const data = await this.model.messenger.getDialogs();
        const processedData = await this.processData(data);

        if (!processedData) {
            // // console.log('err while procc dialogs data');
            return;
        }

        this.view.pushDialogsToList(processedData);
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.clearList();
            this.view.show();
            this.isMounted = true;
        }
    }
}

export default MessengerController; 