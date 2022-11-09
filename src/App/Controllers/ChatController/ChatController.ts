import config from '../../Configs/Config';
import MessengerModel, { IDialog, IMessage } from '../../Models/MessengerModel/MessengerModel';
import UserModel, { IUser } from '../../Models/UserModel/UserModel';
import EventDispatcher from '../../Modules/EventDispatcher/EventDispatcher';
import router from '../../Router/Router';
import ChatView from '../../Views/ChatView/ChatView';
import MessengerView from '../../Views/MessengerView/MessengerView';
import IController from '../IController/IController';
import { IDialogData } from '../MessengerController/MessengerController';



class ChatController extends
    IController<ChatView, { user: UserModel, messenger: MessengerModel }> {
    // private websocket: WebSocket | undefined;
    // private dialogId: string | number | undefined;
    private currentDialogId: string | number | undefined;
    private userID : string | number | undefined;
    private emptyChat: boolean;

    constructor(
        view: ChatView, model: { user: UserModel, messenger: MessengerModel }) {
        super(view, model);

        // this.websocket = undefined;
        // this.dialogId: string | number | undefined;
        this.emptyChat = false;
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
                console.log('No action: ', action);
                return;
            }

            case 'send': {
                console.log('send');
                
                if (this.emptyChat) {
                    console.log('Empty chat');
                    
                    if (!this.userID) {
                        console.log('USer id is null');
                        return;
                    }

                    this.model.messenger.initChat(this.userID)
                        .then((data : IMessage) => {
                            console.log('Init chat succ');
                            
                            this.currentDialogId  = data.dialog_id;

                            this.model.messenger.createChatEventListener(
                                this.currentDialogId,
                                { onmessage: this.view.pushMessage.bind(this) });
                                
                                this.view.pushMessage(data);
                        })
                        .catch(data => {
                            console.log('init chat err');
                            
                            console.log(data);
                        })
                }
            }
        }
    }

    private fillDialog(data: IDialog): void {
        console.log(data);

        this.model.messenger.createChatEventListener(
            data.dialog_id, { onmessage: this.view.pushMessage.bind(this) });

        if (data.messages) {
            this.view.pushMessages(data.messages);

            return;
        }
        console.log('Empty chat');
    }

    public async mountComponent(
        opts?: { userId?: string | number, dialogId?: string | number }) {
        if (!opts) {
            router.showUnknownPage();
            return
        }

        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;

            if (opts.dialogId) {
                console.log('Chat: mode: dialog');

                const dialogId = opts.dialogId;

                this.currentDialogId = dialogId;

                this.model.messenger.getDialog(dialogId)
                    .then((data) => {
                        console.log('Chat: mode: dialog', data);
                        this.fillDialog(data);
                        this.emptyChat = false;
                        this.model.messenger.createChatEventListener(
                            data.dialog_id,
                            {
                                onmessage: this.view.pushMessage.bind(this)
                            }
                        );
                    })
                    .catch((data) => {
                        console.log('Error getting chat by chat id');
                        // this.emptyChat = true;
                        router.showUnknownPage();
                        return;
                    });
                return;
            }

            if (opts.userId) {
                console.log('Chat: mode: user');
                this.userID = opts.userId;

                this.model.messenger.checkChatExist(opts.userId)
                    .then((data) => {
                        console.log('Chat: mode: user', data);
                        this.emptyChat = false;
                        this.fillDialog(data);
                        this.currentDialogId = data.dialog_id;
                        this.model.messenger.createChatEventListener(
                            data.dialog_id,
                            {
                                onmessage: this.view.pushMessage.bind(this)
                            }
                        );
                    })
                    .catch(data => {
                        console.log(data);
                        this.emptyChat = true;
                    });
                return;
            }
            console.log('Mount chat err');
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;

            if (this.currentDialogId) {
                this.model.messenger.removeChatEventListener(this.currentDialogId);
                this.currentDialogId = undefined;
            }
        }
    }
}

export default ChatController;



// if (!opts) {
//     router.showUnknownPage();
//     return
// }

// if (!this.isMounted) {
//     this.view.show();
//     this.isMounted = true;

//     let dialogId : string | number | null = null;

//     if(opts.dialogId){
//         dialogId = opts.dialogId;
//     }

//     if(opts.userId){
//         const userId = opts.userId;
//         const {isExists, dialogId} = await
//         this.model.messenger.checkChatExist();
//     }

//     if(!dialogId) {
//         router.showUnknownPage();
//         return;
//     }

//     this.currentDialogId = dialogId;

//     this.model.messenger.getDialog(dialogId)
//         .then((data) => {
//             console.log(data);
//             this.emptyChat = false;

//             if (!data.messages) {
//                 return;
//             }
//             this.view.pushMessages(data.messages);
//             this.model.messenger.createChatEventListener(dialogId, {
//             onmessage: this.view.pushMessage.bind(this) })
//         })
//         .catch((data) => {
//             console.log('NEW CHAT!!!!!');
//             this.emptyChat = true;
//         });
// }