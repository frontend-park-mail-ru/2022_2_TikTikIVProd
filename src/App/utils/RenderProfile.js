import { header, mainContentElement } from "../App.js";
import Profile from "../components/Profile/Profile.js";
export default function renderProfile(username) {
    header.setLink(username);
    mainContentElement.innerHTML = '';
    const profile = new Profile(mainContentElement);
    profile.render();
}
