import { IFeedData } from "../../Models/FeedModel/FeedModel.js";
import IView from "../IView/IView.js";

export default class FeedView extends IView {
    private feed: HTMLElement;
    constructor(parent: HTMLElement) {
        super(parent);
        this.feed = document.createElement('div');
        this.feed.id = 'feed';
        this.feed.classList.add('feed__container');
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
        window.addEventListener('scroll', listener);
    }

    public bindResizeEvent(listener: any): void {
        window.addEventListener('resize', listener);
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
        console.log('Add content');
    }
}