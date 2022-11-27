import { ICommunityData } from "../../Models/CommunityModel/CommunityModel";
import IView from "../IView/IView";

import communityListTemplate from "./CommunityListView.hbs"
import "./CommunityListView.scss"

import communityListItemTemplate from "../../Components/CommunityListItem/CommunityListItem.hbs"
import "../../Components/CommunityListItem/CommunityListItem.scss"

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

    public clearList(): void {
        this.communitiesList.innerHTML = '';
    }

    public fillList(data: ICommunityData[]): void {
        data.forEach(item => {
            this.communitiesList.innerHTML += communityListItemTemplate(Object.assign(item, { isMember: true}));
        });
    }
}

export default CommunityListView; 