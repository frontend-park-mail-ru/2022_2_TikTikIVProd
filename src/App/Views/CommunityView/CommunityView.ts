import IView from "../IView/IView";

import communityTemplate from "./CommunityView.hbs"
import "./CommunityView.scss"

import communityNavbarTemplate from "../../Components/CommunityNav/CommunityNav.hbs"
import "../../Components/CommunityNav/CommunityNav.scss"

import communityDataTemplate from "../../Components/CommunityData/CommunityData.hbs"
import "../../Components/CommunityData/CommunityData.scss"

import communitySettingsFormTemplate from "../../Components/SettingsForm/SettingsForm.hbs"
import "../../Components/SettingsForm/SettingsForm.scss"
import communitySettingsConfig from "./CommunityViewSettingsConfig"

import { ICommunityData } from "../../Models/CommunityModel/CommunityModel";


export interface ICommunityNavbaParams {
    isAdmin : boolean,
    isMember : boolean,
}

/**
 * Отображение для сообщества
 * @category Community
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для сообщества
 */
class CommunityView extends IView {
    private data: HTMLElement;
    private navbar: HTMLElement;
    private overlay: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, communityTemplate({}), '.community');

        this.data = <HTMLElement>this.element.querySelector('.community__data');
        this.navbar = <HTMLElement>this.element.querySelector('.community__nav');
        this.overlay = <HTMLElement>this.element.querySelector('.community__overlay');
    }

    public bindClick(callback: Function): void {
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
        child.closest('.settings-group')?.querySelectorAll('textarea').forEach((item) =>{
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

    public showOverlaySettings(data: ICommunityData): void {
        
        this.overlay.innerHTML = communitySettingsFormTemplate({config: communitySettingsConfig, data: data});
        this.overlay.classList.remove('community--hidden');
    }

    public hideOverlay(): void {
        this.overlay.innerHTML = ''; 
        this.overlay.classList.add('community--hidden');
    }

    //TODO !!! delete 
    public clear() : void {
        this.navbar.innerHTML = '';
        this.data.innerHTML = '';
    }

    public setCommunityData(data: ICommunityData) : void {
        this.data.innerHTML = communityDataTemplate({data});
    }

    public setCommunityNavbar(data : ICommunityNavbaParams) : void { 
        this.navbar.innerHTML = communityNavbarTemplate({status: data});
    }
}

export default CommunityView; 