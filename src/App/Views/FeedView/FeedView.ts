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
    /**
     * Элемент ленты новостей
     * (приватное поле класса)
     */
    private feed: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        const parser = new DOMParser();

        const feed: HTMLElement | null = parser.parseFromString(feedTemplate({}), 'text/html').querySelector('#feed');
        if (feed === null) {
            throw Error();
        }
        this.feed = feed;
    }
    
    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public show(): void {
        this.parent.appendChild(this.feed);
    }

    /**
     * Реализация метода скрытия вида
     * @returns {void}
     */
    public hide(): void {
        this.parent.removeChild(this.feed);
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


    // public bindClickEvent(callback: Function): void {
    //     this.feed.addEventListener('click', (e) => {
    //         e.preventDefault();

    //         const target = <HTMLElement>e.target;
    //         // TODO
    //     });
    // }

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
            this.feed.appendChild(c);
        });
    }
}

export default FeedView;