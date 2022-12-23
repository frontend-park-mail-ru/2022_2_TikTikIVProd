import IView from "../IView/IView"
import settingsViewConfig from "./SettingsViewConfig";

import settingsViewTemplate from "./SettingsView.hbs"
import "./SettingsView.scss"

import settingsFormTemplate from "../../Components/SettingsForm/SettingsForm.hbs"
import "../../Components/SettingsForm/SettingsForm.scss"
import AvatarUploadView from "../AvatarUploadView/AvatarUploadView";
import { IUser } from "../../Models/UserModel/UserModel";

/**
 * Отображение для настроек пользователя
 * @category Settings
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для настроек
 */
class SettingsView extends IView{
    // private avatarUploadView : AvatarUploadView;

    constructor(parent : HTMLElement) {
        super(parent, settingsViewTemplate({}), '.settings');
    }

    /**
     * Функция отрисовки компонента настроек
     * @param  {?any} opts - Аргументы
     * @return {void}
     */
    public show(opts?: {user: IUser, avatarUploadElement: HTMLElement}): void {
        if(!opts) return;
        this.element.innerHTML = '';
        const tmp = document.createElement('template');
        tmp.innerHTML += settingsFormTemplate({data: opts.user, config: settingsViewConfig});
        this.element.appendChild(opts.avatarUploadElement);
        this.element.appendChild(tmp.content);
        this.parent.appendChild(this.element);
    }
    
    /**
     * Функция добавления обработчика события нажатия на профиль
     * @param  {any} listener - Callback функция для события
     * @return {void}
     */
    public bindClick(callback: Function) : void {
        this.element.addEventListener('click', callback.bind(this));
    }

    /**
     * Функция извлечения данных из формы
     * @param  {HTMLElement} child - любой объект лежалей в форме
     * @return {Map<string, string>}
     */
    public getDataFromGroup(child: HTMLElement): Map<string, string> { 
        const data = new Map();
        child.closest('.settings-group')?.querySelectorAll('input').forEach((item) =>{
            data.set(item.id, item.value);
        });
        return data;
    }

    /**
     * Функция отображения сообщения об ошибке в поле формы
     * @param  {string} id - Идентификатор поля
     * @param  {string} msg - Сообщение об ошибке
     * @return {void}
     */
    public showErrorMsg(id: string, msg: string) : void {

        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.settings-input-with-title');
        if (!inpt) {
            return;
        }
        inpt.classList.add('settings-input-with-title--error');
        (<HTMLElement>inpt.querySelector('.settings-input-with-title__error-msg')).innerHTML = msg;
    }

    /**
     * Функция скрытия сообщения об ошибке в поле формы
     * @param  {string} id - Идентификатор поля
     * @return {void}
     */
    public hideErrorMsg(id: string) : void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.settings-input-with-title');
        if (!inpt) {
            return;
        }
        inpt.classList.remove('settings-input-with-title--error');
    }


    //TODO delete
    public getElement() : HTMLElement {
        return this.element;
    }
}

export default SettingsView;