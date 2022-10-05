import { header, mainContentElement, menu } from "../App.js";
import Feed from "../components/Feed/Feed.js";
import Menu from "../components/Menu/Menu.js";
import config from "../configs/config.js";
import FeedModel from "../models/FeedModel/FeedModel.js";
import renderFeed from "./RenderFeed.js";

export default function renderStartPage(username: string) {
    header.setLink(username);
    menu.render();
    renderFeed(username);
}