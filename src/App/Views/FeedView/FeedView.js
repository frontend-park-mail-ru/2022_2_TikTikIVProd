import feedCardTemplate from "../../Components/FeedCard/FeedCard.js";
import IView from "../IView/IView.js";
export default class FeedView extends IView {
    constructor(parent) {
        super(parent);
        const parser = new DOMParser();
        const feed = parser.parseFromString(feedTemplate({}), 'text/html').querySelector('#feed');
        if (feed === null) {
            throw Error();
        }
        this.feed = feed;
    }
    // Interface 
    show() {
        this.parent.appendChild(this.feed);
    }
    hide() {
        this.parent.removeChild(this.feed);
    }
    // Binders
    bindScrollEvent(listener) {
        window.addEventListener('scroll', listener.bind(this));
    }
    bindResizeEvent(listener) {
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
    unbindScrollEvent(listener) {
        window.removeEventListener('scroll', listener);
    }
    unbindResizeEvent(listener) {
        window.removeEventListener('resize', listener);
    }
    // Specific
    pushContentToFeed(data) {
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
