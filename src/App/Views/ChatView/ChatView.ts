import IView from "../IView/IView";
import messengerViewTemplate from "./ChatView.hbs"
import "./ChatView.scss"

import messageCreateTemplate from "../../Components/MessageCreate/MessageCreate.hbs"
import "../../Components/MessageCreate/MessageCreate.scss"

import messageTemplate from "../../Components/Message/Message.hbs"
import "../../Components/Message/Message.scss"

import chatNavbarTemplate from "../../Components/ChatNavbar/ChatNavbar.hbs"
import "../../Components/ChatNavbar/ChatNavbar.scss"

import { IDialog, IMessage } from "../../Models/MessengerModel/MessengerModel";
import { IDialogData } from "../../Controllers/MessengerController/MessengerController";
import { IMessageData } from "../../Controllers/ChatController/ChatController";

class ChatView extends IView {
    private messagesList: HTMLElement;
    private navbar: HTMLElement;
    private footer: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, messengerViewTemplate({}), '.chat');

        this.messagesList = <HTMLElement>this.element.querySelector('.chat__content');
        this.navbar = <HTMLElement>this.element.querySelector('.chat__navbar');
        this.footer = <HTMLElement>this.element.querySelector('.chat__footer');
    }

    public show(opts?: any): void {
        // this.navbar.innerHTML = chatNavbarTemplate({});
        this.footer.innerHTML = messageCreateTemplate({});
        this.parent.appendChild(this.element);
    }
    
    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public pushMessages(msgs: IMessageData[]): void {
        msgs.forEach(msg => this.pushMessage(msg));
    }

    public pushMessage(msg: IMessageData): void {
        this.messagesList.innerHTML += messageTemplate(msg);
        this.scrollToEnd();
    }

    public clearChat() : void {
        this.messagesList.innerHTML = '';
    }

    public getNewMessage() : string {
        const text = (<HTMLTextAreaElement>this.footer.querySelector('textarea')).value;
        return text;
    }

    private scrollToEnd() : void{
        this.messagesList.scrollTop = this.messagesList.scrollHeight - this.messagesList.clientHeight;
    }

    public setNavbarData(data: IChatNavbar) {
        this.navbar.innerHTML = chatNavbarTemplate(data);
    }

    public clearNewMsgForm() : void {
        (<HTMLTextAreaElement>this.footer.querySelector('textarea')).value = '';
    }
}

export default ChatView; 