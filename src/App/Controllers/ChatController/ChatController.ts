import config from '../../Configs/Config';
import MessengerModel, { IDialog, IMessage } from '../../Models/MessengerModel/MessengerModel';
import UserModel, { IUser } from '../../Models/UserModel/UserModel';
import EventDispatcher from '../../Modules/EventDispatcher/EventDispatcher';
import router from '../../Router/Router';
import paths from '../../Router/RouterPaths';
import dateParser from '../../Utils/DateParser/DateParser';
import ChatView from '../../Views/ChatView/ChatView';
import MessengerView from '../../Views/MessengerView/MessengerView';
import IController from '../IController/IController';
import { IDialogData } from '../MessengerController/MessengerController';


export interface IMessageData {
    user: {
        first_name: string;
        last_name: string;
        avatar: string;
        id: string | number;
    };
    text: string;
    date: string;
}

export interface IChatNavbar {
    first_name: string;
    last_name: string;
    avatar: string;
    id: string | number;
}

class ChatController extends
    IController<ChatView, { user: UserModel, messenger: MessengerModel }> {

    private currentDialogId: string | number | undefined;
    private userID: string | number | undefined;
    private emptyChat: boolean | undefined;

    constructor(
        view: ChatView, model: { user: UserModel, messenger: MessengerModel }) {
        super(view, model);

        this.emptyChat = undefined;
        this.currentDialogId = undefined;
        this.userID = undefined;

        this.view.bindClick(this.handleClick.bind(this));
        this.view.bindKeyClick(this.handleKeyClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }

    private sendMessage(): void {
        const text = this.view.getNewMessage();
        if (text.replace('\n', ' ').trim() === '')
            return;
        if (this.emptyChat) {
            if (!this.userID) return;
            this.model.messenger.initChat(text, this.userID)
                .then((data: IMessage) => {
                    this.currentDialogId = data.dialog_id;
                    this.emptyChat = false;
                    this.model.messenger.createChatEventListener(
                        this.currentDialogId,
                        {
                            onmessage: this.handleMessages.bind(this),
                        },
                    );
                    this.handleMessages(data);
                    this.view.clearNewMsgForm();
                });
        } else {
            const cid = this.model.user.getCurrentUser()?.id;
            if (!cid) return;
            if (!this.currentDialogId) return;
            if (!this.userID) return;
            this.model.messenger.sendMessage(this.currentDialogId, text, cid, this.userID)
            this.view.clearNewMsgForm();
        }
    }

    private handleKeyClick(e: KeyboardEvent): void {
        const target = <HTMLElement>e.target;
        const action =
            (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];

        e.preventDefault();

        if (e.key === 'Enter' && e.ctrlKey) {
            const currentMessage = document.querySelector('textarea');
            if (currentMessage !== null && currentMessage !== undefined) {
                currentMessage.value += '\n';
            }
        }
        else if (e.key === 'Enter') {
            this.sendMessage();
            return;
        }
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        const target = <HTMLElement>e.target;
        const action =
            (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
        switch (action) {
            default: {
                // // console.log('No action: ', action);
                return;
            }

            case 'back': {
                router.goToPath(paths.messenger);
                return;
            }

            case 'user_profile': {
                const user_id = (<HTMLElement>target.closest('[data-user_id]'))?.dataset['user_id'];
                console.log(user_id);

                if (!user_id) return;

                let url = `${paths.userProfie}`;
                url = url.replace('{:number}', user_id);

                router.goToPath(url);
                return;
            }

            case 'send': {
                this.sendMessage();
                return;
            }
        }
    }

    private fillDialog(data: IDialog): void {
        if (data.messages) {
            this.handleMessages(data.messages);
            return;
        }
    }

    public async mountComponent(
        opts?: { userId?: string | number, dialogId?: string | number }) {
        if (!opts) {
            router.showUnknownPage();
            return
        }

        if (!this.isMounted) {
            this.view.clearChat();
            this.view.show();
            this.isMounted = true;

            if (opts.dialogId) {
                const dialogId = opts.dialogId;

                this.currentDialogId = dialogId;

                this.model.messenger.getDialog(dialogId)
                    .then((data) => {
                        this.fillDialog(data);
                        this.emptyChat = false;
                        this.model.messenger.createChatEventListener(
                            data.dialog_id,
                            {
                                onmessage: this.handleMessages.bind(this)
                            }
                        );
                    })
                    .catch((data) => {
                        router.showUnknownPage();
                        return;
                    });
                this.setProfileData();
                return;
            }

            if (opts.userId) {
                this.userID = opts.userId;

                this.model.messenger.checkChatExist(opts.userId)
                    .then((data) => {
                        this.emptyChat = false;
                        this.fillDialog(data);
                        this.currentDialogId = data.dialog_id;
                        this.model.messenger.createChatEventListener(
                            data.dialog_id,
                            {
                                onmessage: this.handleMessages.bind(this)
                            }
                        );
                    })
                    .catch(data => {
                        this.emptyChat = true;
                    });
                this.setProfileData();
                return;
            }
        }
    }

    private async setProfileData() {
        const user = await this.model.user.getUser(this.userID ?? '-1');
        if (!user) return;

        const data: IChatNavbar = {
            avatar: user.avatar ?? '../src/img/default_avatar.png',
            first_name: user.first_name ?? 'Капи',
            last_name: user.last_name ?? 'Неопознаный',
            id: user.id ?? '',
        }
        this.view.setNavbarData(data);
    }

    private async handleMessages(data: IMessage | IMessage[]) {

        if (!Array.isArray(data)) {
            const ndata: IMessage[] = [];
            ndata.push(data);
            data = ndata;
        }

        const msgs: IMessageData[] = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            const user = await this.model.user.getUser(item.sender_id);

            const formatted: IMessageData = {
                user: {
                    avatar: user.avatar ?? '../src/img/default_avatar.png',
                    first_name: user.first_name ?? 'Капи',
                    last_name: user.last_name ?? 'Неопознаный',
                    id: user.id ?? 0,
                },
                text: item.body ?? 'Здесь было сообщение...',
                date: dateParser(item.created_at),
            };

            msgs.push(formatted);
        }

        this.view.pushMessages(msgs);
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;

            if (this.currentDialogId) {
                this.model.messenger.removeChatEventListener(this.currentDialogId);
            }

            this.currentDialogId = undefined;
            this.emptyChat = undefined;
            this.userID = undefined;
        }
    }
}

export default ChatController;
