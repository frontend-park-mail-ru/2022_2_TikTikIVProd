import IView from "../IView/IView"
import profileViewConfig from "./ProfileViewConfig";

import profileTemplate from "./ProfileView.hbs"
import "./ProfileView.css"

import profileUserTemplate from "../../Components/ProfileUser/ProfileUser.hbs"
import "../../Components/ProfileUser/ProfileUser.css"

/**
 * Отображение для профиля пользователя
 * @category Profile
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для профиля
 */
class ProfileView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, profileTemplate(profileViewConfig), '.profile');
    }

    /**
     * Функция добавления обработчика события нажатия на профиль
     * @param  {any} listener - Callback функция для события
     * @return {void}
     */
    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }


    /**
     * Функция отрисовки профиля
     * @param  {?any} opts - Аргументы
     * @return {void}
     */
    public show(opts?: any): void {
        // console.log('opts ', opts);

        const userField = this.element.querySelector('.profile__user');
        if (!userField) {
            // console.log('err');
            return;
        }
        userField.innerHTML = profileUserTemplate(opts);
        this.parent.appendChild(this.element);
    }
}

export default ProfileView;