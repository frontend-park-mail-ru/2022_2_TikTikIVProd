import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
import config from "../../Configs/Config";
import dateParser from "../../Utils/DateParser/DateParser";
import ImageUploadModel, { IImage } from "../ImageModel/ImageModel";
import IModel from "../IModel/IModel"

// Message
export interface IMessage {
    body: string;
    created_at: string;
    dialog_id: number;
    id: number;
    receiver_id: number;
    sender_id: number;
    attachments: IImage[];

    sticker: number;
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
    dialog_id: number;
    receiver_id: number;
    sender_id?: number;
    attachments: IImage[];
    sticker?: number,
    body?: string;
}

class MessengerModel extends IModel {
    private websockets: Map<string, WebSocket>; //{ socket: WebSocket, chatId: string | number }[];

    constructor() {
        super();
        this.websockets = new Map<string, WebSocket>();//= [];
    }

    static parseMessage(json: any): IMessage {
        return {
            id: json.id,
            body: json.body,
            created_at: dateParser(json.created_at),
            dialog_id: json.dialog_id,
            receiver_id: json.receiver_id,
            sender_id: json.sender_id,
            attachments: ImageUploadModel.parseImages(json.attachments),
            sticker: json.sticker,
        };
    }

    private parseMessages(json: any): IMessage[] {
        return json.map((rawMsg: any) => {
            return MessengerModel.parseMessage(rawMsg);
        });
    }

    private parseDialog(json: any): IDialog {
        return {
            dialog_id: json.dialog_id,
            userId1: json.UserId1,
            userId2: json.UserId2,
            messages: json.messages ? this.parseMessages(json.messages) : undefined,
        }
    }

    private parseDialogs(json: any): IDialog[] {
        return json.map((rawDialog: any) => {
            return this.parseDialog(rawDialog);
        });
    }

    public async getDialogs() {
        const response = await ajax(config.api.dialogs);
        await checkResponseStatus(response, config.api.dialogs);
        const dialogsData = this.parseDialogs(response.parsedBody.body);
        return Promise.resolve(dialogsData);
    }


    public async getDialog(dialogId: string | number) {
        let conf = Object.assign({}, config.api.chat);
        conf.url = conf.url.replace('{:id}', dialogId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const dialogData = this.parseDialog(response.parsedBody.body);
        return Promise.resolve(dialogData);
    }

    public async createChatEventListener(chatId: string | number, opts?: { onclose?: Function, onmessage?: Function }) {
        if (this.websockets.has(chatId.toString())) {
            return Promise.resolve();
        }

        if (!window["WebSocket"]) {
            console.log('Websocket is not supported');
            return;
        }

        let host = `${config.host}`.replace('https://', '');

        let conf = Object.assign({}, config.api.initws);
        conf.url = conf.url.replace('{:id}', chatId.toString());

        const _ = await ajax(conf);
        const wsURL = `${config.chatWS}`
            .replace('{:chat_id}', chatId.toString());
        const newSocket = new WebSocket(wsURL);
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
                                const msg: IMessage = MessengerModel.parseMessage(JSON.parse(evt.data));//JSON.parse(evt.data);
                                _callback(msg); //_chatId, 
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    })(chatId, opts.onmessage);
            }
        }

        this.removeChatEventListener(chatId);
        this.websockets.set(chatId.toString(), newSocket);
    }

    public removeChatEventListener(chatId: string | number) {
        this.websockets.get(chatId.toString())?.close();
        this.websockets.delete(chatId.toString());
    }

    public async initChat(message: IMessageNew) {
        const response = await ajax(config.api.chatSend, JSON.stringify(message));
        await checkResponseStatus(response, config.api.chatSend);
        const msgData = MessengerModel.parseMessage(response.parsedBody.body);
        return Promise.resolve(msgData);
    }

    public sendMessage(message: IMessageNew) {
        const ws = this.websockets.get(message.dialog_id.toString());
        if (!ws) {
            console.log('no ws for chat id=', message.dialog_id);
            return;
        }
        console.log('JSON msg: ', JSON.stringify(message));

        ws.send(JSON.stringify(message));
    }

    public async checkChatExist(userId: string | number) {
        let conf = Object.assign({}, config.api.checkChat);
        conf.url = conf.url.replace('{:id}', userId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const dialogData = this.parseDialog(response.parsedBody.body);
        return Promise.resolve(dialogData);
    };
}

export default MessengerModel;