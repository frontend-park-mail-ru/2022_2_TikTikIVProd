import { mainContentElement } from "../App.js";
import Feed from "../components/Feed/Feed.js";
import FeedModel from "../models/FeedModel/FeedModel.js";
export default function renderFeed(username) {
    mainContentElement.innerHTML = '';
    const feed = new Feed(mainContentElement);
    const feedModel = new FeedModel();
    const data = feedModel.getFeeds();
    feed.render(data);
}
