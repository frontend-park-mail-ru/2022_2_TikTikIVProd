import { header, menu } from "../App.js";
import renderFeed from "./RenderFeed.js";
export default function renderStartPage(username) {
    header.setLink(username);
    menu.render();
    renderFeed(username);
}
