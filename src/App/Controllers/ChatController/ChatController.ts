import config from '../../Configs/Config';
import MessengerModel, { IDialog, IMessage, IMessageNew } from '../../Models/MessengerModel/MessengerModel';
import UserModel, { IUser } from '../../Models/UserModel/UserModel';
import EventDispatcher from '../../Modules/EventDispatcher/EventDispatcher';
import router from '../../Router/Router';
import paths from '../../Router/RouterPaths';
import dateParser from '../../Utils/DateParser/DateParser';
import ChatView from '../../Views/ChatView/ChatView';
import AttachmentsUploadController from '../AttachmentsUploadController/AttachmentsUploadController';
import IController from '../IController/IController';

export interface IChatData {
    byUserId?: number | string,
    byDialogId?: number | string,
}

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

    private dialogId: string | number | undefined;
    private userId: string | number | undefined;
    private isEmptyChat: boolean | undefined;

    private msgAttachments: AttachmentsUploadController;
    constructor(
        view: ChatView, model: { user: UserModel, messenger: MessengerModel }) {
        super(view, model);

        this.isEmptyChat = undefined;
        this.dialogId = undefined;
        this.userId = undefined;
        this.msgAttachments = new AttachmentsUploadController();

        this.view.bindClick(this.handleClick.bind(this));
        this.view.bindKeyClick(this.handleKeyClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }

    public async mountComponent(opts?: IChatData) {
        if (!opts) {
            router.showUnknownPage();
            return;

        }
        if (!this.isMounted) {
            this.view.clearChat();
            this.view.show(this.msgAttachments.getElement());
            this.isMounted = true;

            if (opts.byDialogId) {
                this.dialogId = opts.byDialogId;
                this.setProfileData();
                this.model.messenger.getDialog(this.dialogId)
                    .then((data) => {
                        this.fillDialog(data);
                        this.isEmptyChat = false;
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
                return;
            }

            if (opts.byUserId) {
                this.userId = opts.byUserId;
                this.setProfileData();
                this.model.messenger.checkChatExist(this.userId)
                    .then((data) => {
                        console.log('exists');

                        this.isEmptyChat = false;
                        this.fillDialog(data);
                        this.dialogId = data.dialog_id;
                        this.model.messenger.createChatEventListener(
                            data.dialog_id,
                            {
                                onmessage: this.handleMessages.bind(this)
                            }
                        );
                    })
                    .catch(data => {
                        console.log('new');

                        this.isEmptyChat = true;
                    });
                return;
            }
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;

            if (this.dialogId) {
                this.model.messenger.removeChatEventListener(this.dialogId);
            }

            this.dialogId = undefined;
            this.isEmptyChat = undefined;
            this.userId = undefined;
        }
    }

    private async sendMessage() {
        const attachmens = await this.msgAttachments.submitAttachments();

        const text = this.view.getNewMessage();
        if (text.replace('\n', ' ').trim() === '')
            return;

        const message: IMessageNew = {
            body: text,
            receiver_id: Number(this.userId),
            dialog_id: Number(this.dialogId),
            attachments: attachmens,
            // sticker: 0,
        };

        if (this.isEmptyChat) {
            this.initNewDialog(message);
            return;
        }

        if (!this.dialogId) return;
        if (!this.userId) return;
        this.model.messenger.sendMessage(message);
        this.view.clearNewMsgForm();
    }

    private initNewDialog(message: IMessageNew): void {
        this.model.messenger.initChat(message)
            .then((data: IMessage) => {
                console.log('inited new chat ', data);

                this.dialogId = data.dialog_id;
                this.isEmptyChat = false;
                this.model.messenger.createChatEventListener(
                    this.dialogId,
                    {
                        onmessage: this.handleMessages.bind(this),
                    },
                );
                this.handleMessages(data);
                this.view.clearNewMsgForm();
            });
    }

    private handleKeyClick(e: KeyboardEvent): void {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            const currentMessage = document.querySelector('textarea');
            if (currentMessage !== null && currentMessage !== undefined) {
                currentMessage.value += '\n';
            }
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
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
            default: return;
            case 'back': {
                router.goToPath(paths.messenger);
                return;
            }

            case 'user_profile': {
                const user_id = (<HTMLElement>target.closest('[data-user_id]'))?.dataset['user_id'];
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

            case 'add_attachment': {
                this.msgAttachments.addAttachment();
                return;
            }
            case 'smile': {
                // ОБРАБОТКА СМАЙЛОВ
                const currentMessage = document.querySelector('textarea');
                if (currentMessage !== null && currentMessage !== undefined) {
                    currentMessage.value += target.innerText;
                }
            }
        }
    }

    private fillDialog(data: IDialog): void {
        if (!data.messages) return;
        this.handleMessages(data.messages);
    }



    private async setProfileData() {
        const user = await this.model.user.getUser(this.userId ?? '-1');
        if (!user) return;
        const data: IChatNavbar = {
            avatar: user.avatar ?? config.default_img,
            first_name: user.first_name ?? 'Капи',
            last_name: user.last_name ?? 'Неопознаный',
            id: user.id ?? '',
        }
        this.view.setNavbarData(data);
    }

    private async handleMessages(data: IMessage | IMessage[]) {
        if (!Array.isArray(data)) {
            const ndata: IMessage[] = [data];
            data = ndata;
        }

        const msgs: IMessageData[] = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const user = await this.model.user.getUser(item.sender_id);
            const formatted: IMessageData = {
                user: {
                    avatar: user.avatar ?? config.default_img,
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
}

export default ChatController;
