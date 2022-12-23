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

    public fillList(data: ICommunityData[]): void {
        data.forEach(item => {
            this.communitiesList.innerHTML += communityListItemTemplate(Object.assign(item, { isMember: true }));
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
        console.log(id);

        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.input-with-title');
        console.log(inpt);

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

        console.log(<HTMLFieldSetElement>this.overlay.querySelector('fieldset'));
        (<HTMLFieldSetElement>this.overlay.querySelector('fieldset')).disabled = true;
    }

    public unlockForm(): void {

        console.log(<HTMLFieldSetElement>this.overlay.querySelector('fieldset'));
        (<HTMLFieldSetElement>this.overlay.querySelector('fieldset')).disabled = false;

    }

    public getSearchData(): string {
        const name = this.navbar.querySelector('input')?.value;
        return name ?? '';
    }

}

export default CommunityListView; 