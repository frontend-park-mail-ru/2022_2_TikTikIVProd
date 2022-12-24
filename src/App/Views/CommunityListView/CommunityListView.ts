import { ICommunityData } from "../../Models/CommunityModel/CommunityModel";
import IView from "../IView/IView";

import communityListTemplate from "./CommunityListView.hbs"
import "./CommunityListView.scss"

import communityListItemTemplate from "../../Components/CommunityListItem/CommunityListItem.hbs"
import "../../Components/CommunityListItem/CommunityListItem.scss"

import communityListNavbar from "../../Components/CommunityListNavbar/CommunityListNavbar.hbs"
import "../../Components/CommunityListNavbar/CommunityListNavbar.scss"

import communityCreationFormTemplate from "../../Components/Form/Form.hbs"
import "../../Components/Form/Form.scss"
import communityCreationFormConfig from "./CommunityCreationFormConfig";

/**
 * Отображение для сообщества
 * @category Community
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для сообщества
 */
class CommunityListView extends IView {
    private communitiesList: HTMLElement;
    private navbar: HTMLElement;
    private overlay: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, communityListTemplate({}), '.communities');

        this.communitiesList = <HTMLElement>this.element.querySelector('.communities__list');
        this.navbar = <HTMLElement>this.element.querySelector('.communities__navbar');
        this.overlay = <HTMLElement>this.element.querySelector('.communities__overlay');

        this.navbar.innerHTML = communityListNavbar({});

        const observer = new MutationObserver(this.checkFriends.bind(this));
        observer.observe(this.communitiesList, { childList: true });
    }

    private checkFriends() {
        if (!this.communitiesList.querySelector('.community-list-item')) {
            this.element.querySelector('.communities-mock')?.classList.remove('communities--hide');
        } else {
            this.element.querySelector('.communities-mock')?.classList.add('communities--hide');
        }
    }

    public bindClick(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public bindSearchChange(callback: Function): void {
        this.navbar.querySelector('input')?.addEventListener('input', callback.bind(this));
    }

    public clearList(): void {
        this.communitiesList.innerHTML = '';
    }

    public clearInput(): void {
        const input = this.navbar.querySelector('input');
        if (input !== null && input !== undefined) {
            input.value = '';
        }
    }

    public pushCommunity(data: ICommunityData, currentUserId : number | string | null | undefined) : void {
        const tmp = document.createElement('template');
        tmp.innerHTML = communityListItemTemplate(Object.assign(data, {notOwner: currentUserId !== data.owner_id}));
        this.communitiesList.prepend(tmp.content);
    }

    public fillList(data: ICommunityData[], currentUserId: number | string | null | undefined): void {
        data.forEach(item => {
            this.communitiesList.innerHTML += communityListItemTemplate(Object.assign(item, {notOwner: currentUserId !== item.owner_id}));
        });
    }

    public showCommunityCreationForm(): void {
        this.overlay.innerHTML = communityCreationFormTemplate(communityCreationFormConfig);
        this.overlay.classList.remove('communities--hide');
    }


    public hideCommunityCreationForm(): void {
        this.overlay.classList.add('communities--hide');
    }

    public showErrorMsg(id: string, msg: string): void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.input-with-title');
        if (!inpt) {
            return;
        }
        inpt.classList.add('input-with-title--error');
        (<HTMLElement>inpt.querySelector('.input-with-title__error-msg')).innerHTML = msg;
    }

    public hideErrorMsg(id: string): void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.input-with-title');
        if (!inpt) {
            return;
        }
        inpt.classList.remove('input-with-title--error');
    }

    public getFormData(): Map<string, string> {
        const data = new Map();
        this.overlay.querySelectorAll('input').forEach((item) => {
            data.set(item.id, item.value);
        });
        this.overlay.querySelectorAll('textarea').forEach((item) => {
            data.set(item.id, item.value);
        });
        return data;
    }

    public lockForm(): void {
        (<HTMLFieldSetElement>this.overlay.querySelector('fieldset')).disabled = true;
    }

    public unlockForm(): void {
        (<HTMLFieldSetElement>this.overlay.querySelector('fieldset')).disabled = false;
    }

    public getSearchData(): string {
        const name = this.navbar.querySelector('input')?.value;
        return name ?? '';
    }

    public updateCommunity(communityData: ICommunityData, currentUserId : number | string | null | undefined): void {
        const communityElem = this.communitiesList.querySelector(`.community-list-item[data-community_id="${communityData.id}"]`);
        if (!communityElem) return;
        
        const container = communityElem.parentElement;
        if(!container) return;

        const tmp = document.createElement('template');
        tmp.innerHTML = communityListItemTemplate(Object.assign(communityData, {notOwner: currentUserId !== communityData.owner_id}));

        const newCommunityElem = tmp.content.querySelector('.community-list-item');
        if(!newCommunityElem) return;

        container.insertBefore(newCommunityElem, communityElem);
        container.removeChild(communityElem);
    }
}

export default CommunityListView; 