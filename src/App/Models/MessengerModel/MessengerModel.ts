import { Value } from "sass";
import ajax from "../../Ajax/Ajax";
import config from "../../Configs/Config";
import IModel from "../IModel/IModel"

// Message
export interface IMessage {
    body: string;
    created_at: string;
    dialog_id: number;
    id: number;
    receiver_id: number;
    sender_id: number
}

// GET Dialogs
export interface IDialog {
    dialog_id: number;
    userId1: number;
    userId2: number;
    messages?: IMessage[];
}

// send new msg
export interface IMessageNew {
    body: string;
    dialog_id: number;
    receiver_id: number;
}

class MessengerModel extends IModel {

    private websockets: Map<string, WebSocket>; //{ socket: WebSocket, chatId: string | number }[];

    constructor() {
        super();
        this.websockets = new Map<string, WebSocket>();//= [];
    }

    public async getDialogs() {
        const response = await ajax(config.api.dialogs);

        if (response.status.toString() in config.api.dialogs.statuses.success) {

            const rawDialogs: IDialog[] = response.parsedBody.body.map((rawDialog: any) => {
                return {
                    dialog_id: rawDialog.dialog_id,
                    userId1: rawDialog.userId1,
                    userId2: rawDialog.userId2,
                }
            });

            return Promise.resolve(rawDialogs);
        }

        if (response.status.toString() in config.api.dialogs.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.dialogs.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.dialogs.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }

    public async getDialog(dialogId: string | number) {
        let conf = Object.assign({}, config.api.chat);
        conf.url = conf.url.replace('{:id}', dialogId.toString());

        const response = await ajax(conf);
        if (response.status.toString() in config.api.chat.statuses.success) {

            const rawDialog: IDialog = {
                dialog_id: response.parsedBody.body.dialog_id,
                userId1: response.parsedBody.body.userId1,
                userId2: response.parsedBody.body.userId2,
                messages: response.parsedBody.body.messages.map((rawMsg: any) => {
                    const msg: IMessage = {
                        id: rawMsg.id,
                        body: rawMsg.body,
                        created_at: rawMsg.created_at,
                        dialog_id: rawMsg.dialog_id,
                        receiver_id: rawMsg.receiver_id,
                        sender_id: rawMsg.sender_id,
                    };
                    return msg;
                }),
            };

            return Promise.resolve(rawDialog);
        }

        if (response.status.toString() in config.api.chat.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.chat.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.chat.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }

    public async createChatEventListener(chatId: string | number, opts?: { onclose?: Function, onmessage?: Function }) {
        if (!window["WebSocket"]) {
            console.log('Websocket is not supported');
            return;
        }

        let host = Object.assign({url: config.host}).url;
        host = host.replace('http://', '');

        let conf = Object.assign({}, config.api.initws);
        conf.url = conf.url.replace('{:id}', chatId.toString());

        const _ = await ajax(conf);

        const newSocket = new WebSocket("ws://"+host+"/ws/" + chatId);

        if (opts) {
            if (opts.onclose) {
                newSocket.onclose = (function (this: any, chatId: string | number, callback: Function) {
                    this.chatId = chatId;
                    this.callback = callback;
                    return (evt: CloseEvent) => {
                        this.callback(this.chatId);
                    }
                })(chatId, opts.onclose);
            }
            if (opts.onmessage) {
                newSocket.onmessage =
                    (function (chatId: string | number, callback: Function) {
                        const _chatId = chatId;
                        const _callback = callback;
                        return (evt: MessageEvent<any>) => {
                            try {
                                const msg: IMessage = JSON.parse(evt.data);
                                _callback(_chatId, msg);
                                console.log(msg);
                                
                            } catch (error) { console.log(error); }
                        }
                    })(chatId, opts.onmessage);
            }
        }

        this.removeChatEventListener(chatId);
        this.websockets.set(chatId.toString(), newSocket);
    }

    public removeChatEventListener(chatId: string | number) {
        this.websockets.get(chatId.toString())?.close();
    }

    public async initChat(userId: string | number) {
        console.log('init: ', JSON.stringify({ body: '', receiver_id: Number(userId) }));

        const response = await ajax(config.api.chatSend, JSON.stringify({ body: '', receiver_id: Number(userId) }));
        console.log('init resp: ', response);

        if (response.status.toString() in config.api.chatSend.statuses.success) {
            const rawMsg = response.parsedBody.body;
            const msg: IMessage = {
                body: rawMsg.body,
                created_at: rawMsg.created_at,
                dialog_id: rawMsg.dialog_id,
                id: rawMsg.id,
                receiver_id: rawMsg.receiver_id,
                sender_id: rawMsg.sender_id,
            }
            console.log('init msg: ', msg);

            return Promise.resolve(msg);
        }

        if (response.status.toString() in config.api.chatSend.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.chatSend.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.chatSend.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });

    }

    public sendMessage(dialogId : string | number, text: string, sender_id : string | number, receiver_id : string | number) {
        const ws = this.websockets.get(dialogId.toString());
        if(!ws){
            console.log('No ws for ', dialogId);
            return;
        }

        ws.send(JSON.stringify({
            body: text,
            sender_id: sender_id,
            receiver_id: receiver_id,
        }));
    }

    public async checkChatExist(userId: string | number) {
        let conf = Object.assign({}, config.api.checkChat);
        conf.url = conf.url.replace('{:id}', userId.toString());

        const response = await ajax(conf);

        if (response.status.toString() in config.api.checkChat.statuses.success) {
            const rawDialog: IDialog = {
                dialog_id: response.parsedBody.body.dialog_id,
                userId1: response.parsedBody.body.userId1,
                userId2: response.parsedBody.body.userId2,
                messages: response.parsedBody.body.messages.map((rawMsg: any) => {
                    const msg: IMessage = {
                        id: rawMsg.id,
                        body: rawMsg.body,
                        created_at: rawMsg.created_at,
                        dialog_id: rawMsg.dialog_id,
                        receiver_id: rawMsg.receiver_id,
                        sender_id: rawMsg.sender_id,
                    };
                    return msg;
                }),
            };

            return Promise.resolve(rawDialog);
        }

        if (response.status.toString() in config.api.chatSend.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.chatSend.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.chatSend.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }
};

export default MessengerModel;