import feedCardTemplate from "../../Components/FeedCard/FeedCard.hbs"
import "../../Components/FeedCard/FeedCard.css"

import feedCardCreationTemplate from "../../Components/FeedCardCreate/FeedCardCreate.hbs"
import "../../Components/FeedCardCreate/FeedCardCreate.css"

import feedNavbarTemplate from "../../Components/FeedNavbar/FeedNavbar.hbs"
import "../../Components/FeedNavbar/FeedNavbar.css"

import feedTemplate from "./FeedView.hbs"
import "./FeedView.css"

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
    private navbar : HTMLElement;
    private cards : HTMLElement;
    private overlay : HTMLElement;

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
        window.addEventListener('scroll', listener.bind(this));
    }

    /**
     * Функция добавления обработчика события изменения размера страницы
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindResizeEvent(listener: any): void {
        window.addEventListener('resize', listener.bind(this));
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


    public getNewPostData() : {text: string} {
        const form = this.overlay.querySelector('.feed__card__new');
        if(!form){
            console.log('Post create no form');
            return {text: ''};
        }

        const textar = <HTMLTextAreaElement>form.querySelector('.feed__card__new__content__text')
        console.log(textar);

        const text = textar.value;
        console.log(text);
        
        
        return {text: text};
    }
    
    /**
     * Функция отрисовки контента (постов) в ленте новостей
     * @param  {IFeedData[]} data - Данные о постах
     * @return {void}
     */
    public pushContentToFeed(data: IFeedData[]) : void {
        // TODO
        const parser = new DOMParser();
        data.forEach((item) => {
            const card = feedCardTemplate(item);
            const c = parser.parseFromString(card, 'text/html').querySelector('.feed__card');
            if (c === null) {
                return;
            }
            this.cards.appendChild(c);
        });
    }

    public showFeedCardCreation(user : IUser) : void { 
        this.overlay.innerHTML = feedCardCreationTemplate(user);
        this.overlay.style.visibility = 'visible';
    }

    public hideFeedCardCreation() : void {
        this.overlay.innerHTML = '';
        this.overlay.style.visibility = 'collapse';
    }

    public showNavbar() : void {
        this.navbar.innerHTML = feedNavbarTemplate({});
        this.navbar.style.visibility = 'visible';
    }

    public hideNavbar() : void{
        this.navbar.style.visibility = 'collapse';
    }
}

export default FeedView;