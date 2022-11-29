import config from '../../Configs/Config';
import MessengerModel, { IDialog, IMessage } from '../../Models/MessengerModel/MessengerModel';
import UserModel, { IUser } from '../../Models/UserModel/UserModel';
import EventDispatcher from '../../Modules/EventDispatcher/EventDispatcher';
import router from '../../Router/Router';
import paths from '../../Router/RouterPaths';
import ChatView from '../../Views/ChatView/ChatView';
import MessengerView from '../../Views/MessengerView/MessengerView';
import IController from '../IController/IController';
import { IDialogData } from '../MessengerController/MessengerController';


export interface IMessageData {
    user: {
        first_name: string;
        last_name: string;
        avatar: string;
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
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
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

            case 'back':{
                router.goToPath(paths.messenger);
                return;
            }
            
            case 'user_profile':{
                const user_id = (<HTMLElement>target.closest('[data-user_id]'))?.dataset['user_id'];
                console.log(user_id);
                
                if(!user_id) return;

                let url = `${paths.userProfie}`;
                url = url.replace('{:number}', user_id);

                router.goToPath(url);
                return;
            }

            case 'send': {
                // // console.log('send');

                if (this.emptyChat) {
                    // // console.log('Empty chat');

                    if (!this.userID) {
                        // console.log('USer id is null');
                        return;
                    }

                    const text = this.view.getNewMessage();
                    this.model.messenger.initChat(text, this.userID)
                        .then((data: IMessage) => {
                            // // console.log('Init chat succ');

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
                        })
                        .catch(data => {
                            // console.log('init chat err');

                            // console.log(data);
                        });
                } else {

                    const cid = this.model.user.getCurrentUser()?.id;
                    if (!cid) {
                        return;
                    }

                    if (!this.currentDialogId) {
                        return;
                    }

                    if (!this.userID) {
                        return;
                    }

                    const text = this.view.getNewMessage();
                    // // console.log('text');

                    this.model.messenger.sendMessage(this.currentDialogId, text, cid, this.userID)
                    this.view.clearNewMsgForm();
                }
            }
        }
    }

    private fillDialog(data: IDialog): void {
        // // console.log(data);

        // this.model.messenger.createChatEventListener(
        // data.dialog_id, { onmessage: this.view.pushMessage.bind(this) });

        if (data.messages) {
            this.handleMessages(data.messages);

            return;
        }
        // // console.log('Empty chat');
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
                // // console.log('Chat: mode: dialog');

                const dialogId = opts.dialogId;

                this.currentDialogId = dialogId;

                this.model.messenger.getDialog(dialogId)
                    .then((data) => {
                        // // console.log('Chat: mode: dialog', data);
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
                        // console.log('Error getting chat by chat id');
                        // this.emptyChat = true;
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
                        // // console.log(data);
                        this.emptyChat = true;
                    });
                this.setProfileData();
                return;
            }
            // console.log('Mount chat err');
        }
    }

    private async setProfileData() {
        const user = await this.model.user.getUser(this.userID ?? '-1');
        if(!user) return;

        const data : IChatNavbar = {
            avatar: user.avatar ?? '../src/img/test_avatar.jpg',
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
                    avatar: user.avatar ?? '../src/img/test_avatar.jpg',
                    first_name: user.first_name ?? 'Капи',
                    last_name: user.last_name ?? 'Неопознаный',
                },
                text: item.body ?? 'Здесь было сообщение...',
                date: `${new Date(item.created_at).toJSON().slice(0, 10).replace(/-/g, '/')}`,
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
