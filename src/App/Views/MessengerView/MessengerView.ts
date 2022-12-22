import IView from "../IView/IView";

import messengerViewTemplate from "./MessengerView.hbs";
import "./MessengerView.scss";

import dialogTemplate from "../../Components/Dialog/Dialog.hbs";
import "../../Components/Dialog/Dialog.scss";

import friendNavbarTemplate from "../../Components/FriendsNavbar/FriendsNavbar.hbs";
import "../../Components/FriendsNavbar/FriendsNavbar.scss";

import { IDialogData } from "../../Controllers/MessengerController/MessengerController";

class MessengerView extends IView {
    private dialogsList: HTMLElement;
    private frinedNavbar: HTMLElement;


    constructor(parent: HTMLElement) {
        super(parent, messengerViewTemplate({}), '.messenger');

        this.dialogsList = <HTMLElement>this.element.querySelector('.messenger__content');
        this.frinedNavbar = <HTMLElement>this.element.querySelector('.messenger__navbar');
        this.frinedNavbar.innerHTML = friendNavbarTemplate({});


        // const nav = this.element.querySelector('.messenger__navbar');
        // if (!nav) { return; }
        // nav.innerHTML += chatNavbarTemplate({});


        // const elem = this.element.querySelector('.messenger__footer');
        // if (!elem) { return; }
        // elem.innerHTML += messageCreateTemplate({});

        const msgs = this.element.querySelector('.messenger__content');
        if (!msgs) { return; }

        const observer = new MutationObserver(this.checkDialogs.bind(this));
        observer.observe(this.dialogsList, { childList: true });
    }

    private checkDialogs() {
        console.log('dialogs changed', this.dialogsList.querySelector('.dialog'));

        if (!this.dialogsList.querySelector('.dialog')) {
            this.element.querySelector('.messenger-mock')?.classList.remove('messenger--hide');
        } else {
            this.element.querySelector('.messenger-mock')?.classList.add('messenger--hide');
        }
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public pushDialogsToList(data: IDialogData[]): void {
        data.forEach(item => {
            this.dialogsList.innerHTML += dialogTemplate(item);
        })
    }

    public clearList(): void {
        this.dialogsList.innerHTML = '';
    }

}

export default MessengerView; 