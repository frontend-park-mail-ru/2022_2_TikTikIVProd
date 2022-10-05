import { header, mainContentElement, menu } from "../App.js";
import Feed from "../components/Feed/Feed.js";
import Profile from "../components/Profile/Profile.js";
import FeedModel from "../models/FeedModel/FeedModel.js";

export default function renderFeed(username: string) {
    mainContentElement.innerHTML = '';
    const feed = new Feed(mainContentElement);
    const feedModel = new FeedModel();
    const data = feedModel.getFeeds();
    feed.render(data)
}