import feedCardTemplate from "../../Components/FeedCard/FeedCard.ts";
import { IFeedData } from "../../Models/FeedModel/FeedModel.ts";
import IView from "../IView/IView.ts";

export default class FeedView extends IView {
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

    // Interface 
    public show(): void {
        this.parent.appendChild(this.feed);
    }

    public hide(): void {
        this.parent.removeChild(this.feed);
    }

    // Binders
    public bindScrollEvent(listener: any): void {
        window.addEventListener('scroll', listener.bind(this));
    }

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

    // Unbinders
    public unbindScrollEvent(listener: any): void {
        window.removeEventListener('scroll', listener);
    }

    public unbindResizeEvent(listener: any): void {
        window.removeEventListener('resize', listener);
    }


    // Specific

    public pushContentToFeed(data: IFeedData[]) {
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


const source = `
<div id="feed" class="feed__container"></div>
`;

const feedTemplate = Handlebars.compile(source);