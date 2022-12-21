import IView from "../IView/IView";

import friendsViewTemplate from "./FriendsView.hbs";
import "./FriendsView.scss";

import friendTemplate from "../../Components/Friend/Friend.hbs";
import "../../Components/Friend/Friend.scss";

import friendNavbarTemplate from "../../Components/FriendsNavbar/FriendsNavbar.hbs";
import "../../Components/FriendsNavbar/FriendsNavbar.scss";

import { IUser } from "../../Models/UserModel/UserModel";

class FriendsView extends IView {
    private frinedNavbar: HTMLElement;
    private friendList: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, friendsViewTemplate({}), '.friends');
        this.friendList = <HTMLElement>this.element.querySelector('.friends__content');
        this.frinedNavbar = <HTMLElement>this.element.querySelector('.friends__navbar');
        this.frinedNavbar.innerHTML = friendNavbarTemplate({});

        const observer = new MutationObserver(this.checkFriends.bind(this));
        observer.observe(this.friendList, { childList: true });
    }

    private checkFriends() {
        if (!this.friendList.querySelector('.friend')) {
            this.showMock('Пользователи не найдены');
        } else {
            this.hideMock();
        }
    }

    public bindSearchChange(callback: Function): void {
        this.frinedNavbar.querySelector('input')?.addEventListener('input', callback.bind(this));
    }

    public changeUserFriendshipStatus(user: IUser, isFriend: boolean): void {

        const oldItem = this.friendList.querySelector(`[id="${user.id}"]`);
        if (!oldItem) {
            return;
        }
        const parser = new DOMParser();
        const newItem = parser.parseFromString(friendTemplate(Object.assign(user, { isCurent: false, isFriend: isFriend })), 'text/html').querySelector('.friend');
        if (!newItem) {
            return;
        }
        this.friendList.insertBefore(newItem, oldItem);
        this.friendList.removeChild(oldItem);
    }

    public showMock(msg: string): void {
        const mock = this.element.querySelector('.friend-mock');
        if (!mock) return;
        mock.classList.remove('friends--hide');
        (<HTMLDivElement>mock.querySelector('.friend-mock__text')).innerText = msg;
    }

    public hideMock(): void {

        const mock = this.element.querySelector('.friend-mock');
        if (!mock) return;
        mock.classList.add('friends--hide');
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public clearList(): void {
        this.friendList.innerHTML = '';
    }

    public clearInput(): void {
        const input = this.frinedNavbar.querySelector('input');
        if (input !== null && input !== undefined) {
            input.value = '';
        }
    }

    public fillList(users: any[]): void {
        users.forEach(user => {
            this.friendList.innerHTML += friendTemplate(user);
        });
    }

    public getSearchData(): string {
        const name = this.frinedNavbar.querySelector('input')?.value;
        return name ?? '';
    }
}

export default FriendsView; 