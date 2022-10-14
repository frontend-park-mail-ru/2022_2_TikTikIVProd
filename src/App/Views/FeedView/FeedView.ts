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

    public render() {
        this.parent.innerHTML = '';
        this.parent.appendChild(this.feed);
    }

    public bindScrollEvent(callback: Function): void {
        window.addEventListener('scroll', () => { callback() });
    }

    public bindResizeEvent(callback: Function): void {
        window.addEventListener('resize', () => { callback() });
    }

    public bindClickEvent(callback: Function): void {
        this.feed.addEventListener('click', (e) => {
            e.preventDefault();

            const target = <HTMLElement>e.target;
            // TODO
        });
    }

    public pushContentToFeed(data: IFeedData[]) {
        // TODO
        console.log('Add content');
    }
}