import feedCardTemplate from "../../Components/FeedCard/FeedCard.hbs"
import "../../Components/FeedCard/FeedCard.css"

import feedTemplate from "./FeedView.hbs"
import "./FeedView.css"

import { IFeedData } from "../../Models/FeedModel/FeedModel";
import IView from "../IView/IView";

/**
 * Отображение для ленты новостей
 * @category Feed
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для ленты новостей
 */
class FeedView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, feedTemplate({}), '#feed');
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
            this.element.appendChild(c);
        });
    }
}

export default FeedView;