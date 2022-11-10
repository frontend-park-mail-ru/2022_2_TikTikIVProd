import feedCardTemplate from "../../Components/FeedCard/FeedCard.hbs"
import "../../Components/FeedCard/FeedCard.scss"

import feedCardCreationTemplate from "../../Components/FeedCardCreate/FeedCardCreate.hbs"
import "../../Components/FeedCardCreate/FeedCardCreate.scss"

import feedNavbarTemplate from "../../Components/FeedNavbar/FeedNavbar.hbs"
import "../../Components/FeedNavbar/FeedNavbar.scss"

import feedTemplate from "./FeedView.hbs"
import "./FeedView.scss"

import { IFeedData } from "../../Models/FeedModel/FeedModel";
import IView from "../IView/IView";
import { IUser } from "../../Models/UserModel/UserModel"

/**
 * Отображение для ленты новостей
 * @category Feed
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для ленты новостей
 */
class FeedView extends IView {
    private navbar: HTMLElement;
    private cards: HTMLElement;
    private overlay: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, feedTemplate({}), '.feed');
        this.navbar = <HTMLElement>this.element.querySelector('.feed__navbar');
        this.cards = <HTMLElement>this.element.querySelector('.feed__cards');
        this.overlay = <HTMLElement>this.element.querySelector('.feed__overlay');
    }

    /**
     * Функция добавления обработчика события пролистывания страницы
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindScrollEvent(listener: any): void {
        this.cards.addEventListener('scroll', listener.bind(this));
    }

    /**
     * Функция добавления обработчика события изменения размера страницы
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindResizeEvent(listener: any): void {
        this.cards.addEventListener('resize', listener.bind(this));
    }

    /**
     * Функция добавления обработчика события нажатия на ленту
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindClickEvent(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    // Specific

    public clearFeed(): void {
        this.cards.innerHTML = '';
    }


    public getEditedPostData(): { id: string | undefined, text: string | undefined } {

        const form = this.overlay.querySelector('.feed-card-create');
        if (!form) {
            console.log('Post create no form');
            return { id: undefined, text: undefined };
        }

        const id = form?.id;
        const text = (<HTMLTextAreaElement>form.querySelector('.feed-card-create__text')).value;

        return {id: id, text: text};
    }

    public getNewPostData(): { text: string } {
        const form = this.overlay.querySelector('.feed-card-create');
        if (!form) {
            console.log('Post create no form');
            return { text: '' };
        }

        const textar = <HTMLTextAreaElement>form.querySelector('.feed-card-create__text')
        const text = textar.value;

        return { text: text };
    }

    /**
     * Функция отрисовки контента (постов) в ленте новостей
     * @param  {IFeedData[]} data - Данные о постах
     * @return {void}
     */
    public pushContentToFeed(data: IFeedData[], currentUserId: number): void {
        // TODO
        // const parser = new DOMParser();
        // console.log(data);

        data.forEach((item) => {
            const card = feedCardTemplate(currentUserId !== item.author.id ? item : Object.assign(item, { showTools: true }));
            // const c = parser.parseFromString(card, 'text/html').querySelector('.feed-card');
            // if (c === null) {
            // return;
            // }
            // this.cards.appendChild(c);
            this.cards.innerHTML += card;
        });
    }

    public deletePost(id: number | string): void {
        const feed = this.cards.querySelector(`[id="${id}"]`);
        // console.log(feed);

        if (!feed) {
            return;
        }
        this.cards.removeChild(feed);
    }

    public showFeedCardCreation(user: IUser, exsData?: IFeedData): void {
        this.overlay.innerHTML = feedCardCreationTemplate({ user: user, data: exsData });
        this.overlay.style.visibility = 'visible';
    }

    public hideFeedCardCreation(): void {
        this.overlay.innerHTML = '';
        this.overlay.style.visibility = 'collapse';
    }

    public showNavbar(): void {
        this.navbar.innerHTML = feedNavbarTemplate({});
        this.navbar.style.visibility = 'visible';
    }

    public hideNavbar(): void {
        this.navbar.style.visibility = 'collapse';
    }
}

export default FeedView;