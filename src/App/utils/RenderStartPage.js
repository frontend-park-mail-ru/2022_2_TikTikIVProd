import { header, mainContentElement, menuElement } from "../App.js";
import Feed from "../components/Feed/Feed.js";
import Menu from "../components/Menu/Menu.js";
import FeedModel from "../models/FeedModel/FeedModel.js";
export default function renderStartPage(username) {
    header.setLink(username);
    const menu = new Menu(menuElement);
    const feed = new Feed(mainContentElement);
    const feedModel = new FeedModel();
    const data = feedModel.getFeeds();
    menu.render();
    feed.render(data);
}
