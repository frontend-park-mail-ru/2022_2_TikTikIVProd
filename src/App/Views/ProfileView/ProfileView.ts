import IView from "../IView/IView"
import { IUser } from "../../Models/UserModel/UserModel";

import profileTemplate from "./ProfileView.hbs"
import "./ProfileView.scss"

import profileNavbarTemplate from "../../Components/ProfileNav/ProfileNav.hbs"
import "../../Components/ProfileNav/ProfileNav.scss"

import profileUserTemplate from "../../Components/ProfileUser/ProfileUser.hbs"
import "../../Components/ProfileUser/ProfileUser.scss"


/**
 * Отображение для профиля пользователя
 * @category Profile
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для профиля
 */
class ProfileView extends IView {
    private user: HTMLElement;
    private navbar: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, profileTemplate({}), '.profile');

        this.user = <HTMLElement>this.element.querySelector('.profile__user');
        this.navbar = <HTMLElement>this.element.querySelector('.profile__nav');
    }

    /**
     * Функция добавления обработчика события нажатия на профиль
     * @param  {any} listener - Callback функция для события
     * @return {void}
     */
    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public redrawProfile(user: IUser, currentUser: IUser, isFriend : boolean): void {
        const status = {
            isCurrent: user.id === currentUser.id,
            isFriend: isFriend,
        }

        this.user.innerHTML = profileUserTemplate(user);
        this.navbar.innerHTML = profileNavbarTemplate({ status: status });
    }
}

export default ProfileView;