import IView from "../IView/IView"
import settingsViewConfig from "./SettingsViewConfig";

import settingsViewTemplate from "./SettingsView.hbs"
import "./SettingsView.css"

import settingsFormTemplate from "../../Components/SettingsForm/SettingsForm.hbs"
import "../../Components/SettingsForm/SettingsForm.css"

/**
 * Отображение для настроек пользователя
 * @category Settings
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для настроек
 */
class SettingsView extends IView{
    constructor(parent : HTMLElement) {
        super(parent, settingsViewTemplate({}), '.settings__container');
    }
    
    /**
     * Функция отрисовки компонента настроек
     * @param  {?any} opts - Аргументы
     * @return {void}
     */
    public show(opts?: any): void {
        // TODO avatar upload;
        this.element.innerHTML = '';
        //
        this.element.innerHTML += settingsFormTemplate({data: opts, config: settingsViewConfig});

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
        child.closest('.group')?.querySelectorAll('input').forEach((item) =>{
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
        const inpt = <HTMLElement>this.element.querySelector('#'+id);
        const msgField = <HTMLElement>this.element.querySelector('#'+id+'-msg');
        if(!inpt || !msgField){
            return;
        }
        inpt.classList.add('invalid');
        msgField.innerText = msg;
        msgField.style.visibility = 'visible';
    }

    /**
     * Функция скрытия сообщения об ошибке в поле формы
     * @param  {string} id - Идентификатор поля
     * @return {void}
     */
    public hideErrorMsg(id: string) : void {
        const inpt = <HTMLElement>this.element.querySelector('#'+id);
        const msgField = <HTMLElement>this.element.querySelector('#'+id+'-msg');
        if(!inpt || !msgField){
            return;
        }
        inpt.classList.remove('invalid');
        msgField.innerText = '';
        msgField.style.visibility = 'hidden';
    }
}

export default SettingsView;