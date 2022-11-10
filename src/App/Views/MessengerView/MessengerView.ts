import IView from "../IView/IView";
import messengerViewTemplate from "./MessengerView.hbs"
import "./MessengerView.scss"

import messageCreateTemplate from "../../Components/MessageCreate/MessageCreate.hbs"
import "../../Components/MessageCreate/MessageCreate.scss"

import messageTemplate from "../../Components/Message/Message.hbs"
import "../../Components/Message/Message.scss"

import chatNavbarTemplate from "../../Components/ChatNavbar/ChatNavbar.hbs"
import "../../Components/ChatNavbar/ChatNavbar.scss"

import dialogTemplate from "../../Components/Dialog/Dialog.hbs"
import "../../Components/Dialog/Dialog.scss"
import { IDialog } from "../../Models/MessengerModel/MessengerModel";
import { IDialogData } from "../../Controllers/MessengerController/MessengerController";

class MessengerView extends IView {
    private dialogsList : HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, messengerViewTemplate({}), '.messenger');

        this.dialogsList = <HTMLElement>this.element.querySelector('.messenger__content');

        // const nav = this.element.querySelector('.messenger__navbar');
        // if (!nav) { return; }
        // nav.innerHTML += chatNavbarTemplate({});


        // const elem = this.element.querySelector('.messenger__footer');
        // if (!elem) { return; }
        // elem.innerHTML += messageCreateTemplate({});

        const msgs = this.element.querySelector('.messenger__content');
        if (!msgs) { return; }
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public pushDialogsToList(data: IDialogData[]) : void {
        data.forEach(item => {
            this.dialogsList.innerHTML += dialogTemplate(item);
        })
    }

    public clearList() : void {
        this.dialogsList.innerHTML = '';
    }
     
}

export default MessengerView; 