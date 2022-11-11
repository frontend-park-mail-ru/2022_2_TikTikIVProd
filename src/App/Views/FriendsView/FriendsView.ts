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
    }

    // public show(opts?: any): void {
    //     const user : IUser = {
    //         id: 0,
    //         first_name: 'Valera',
    //         last_name: 'Valeriev',
    //         nick_name: 'wdawd',
    //         avatar: '../src/img/test_avatar.jpg',
    //         email: 'email',
    //     }

    //     for (let i = 0; i < 10; i++) {
    //         const element = friendTemplate(user);
    //         this.friendList.innerHTML += element;
    //     }
    //     this.parent.appendChild(this.element);
    // }

    public bindClick(callback : Function) : void{
        this.element.addEventListener('click', callback.bind(this));
    }

    public clearList() : void {
        this.friendList. innerHTML = '';
    }

    public fillList(users: IUser[]) : void { 
        users.forEach(user =>{
            this.friendList.innerHTML += friendTemplate(Object.assign(user, {isCurrent: false, isFriend: true}));
        });
    }
}

export default FriendsView; 