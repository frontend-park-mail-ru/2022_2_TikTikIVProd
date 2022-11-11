import IView from "../IView/IView";

import friendsViewTemplate from "./FriendsView.hbs"
import "./FriendsView.scss"

import friendTemplate from "../../Components/Friend/Friend.hbs"
import "../../Components/Friend/Friend.scss"

import { IUser } from "../../Models/UserModel/UserModel";

class FriendsView extends IView {
    private friendList: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, friendsViewTemplate({}), '.friends');
        this.friendList = <HTMLElement>this.element.querySelector('.friends__content');

        const observer = new MutationObserver(this.checkFriends.bind(this));
        observer.observe(this.friendList, { childList: true });
    }

    private checkFriends() {
        console.log('frineds changed', this.friendList.querySelector('.friend'));

        if (!this.friendList.querySelector('.friend')) {
            this.element.querySelector('.friend-mock')?.classList.remove('friends--hide');
        } else {
            this.element.querySelector('.friend-mock')?.classList.add('friends--hide');
        }
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public clearList(): void {
        this.friendList.innerHTML = '';
    }

    public fillList(users: IUser[]): void {
        users.forEach(user => {
            this.friendList.innerHTML += friendTemplate(Object.assign(user, { isCurrent: false, isFriend: true }));
        });
    }
}

export default FriendsView; 