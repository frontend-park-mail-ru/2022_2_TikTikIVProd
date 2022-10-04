import { mainContentElement, menuElement } from "../App.js";
import Feed from "../components/Feed/Feed.js";
import Menu from "../components/Menu/Menu.js";
import config from "../configs/config.js";
import FeedModel from "../models/FeedModel/FeedModel.js";
export default function renderStartPage() {
    const menu = new Menu(menuElement);
    const feed = new Feed(mainContentElement);
    const feedModel = new FeedModel();
    const data = feedModel.getFeeds();
    menu.items = config.menu;
    menu.render();
    feed.render(data);
}
