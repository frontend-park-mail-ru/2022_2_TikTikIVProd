import { header, mainContentElement, menu } from "../App.js";
import Profile from "../components/Profile/Profile.js";

export default function renderProfile(username: string) {
    header.setLink(username);
    mainContentElement.innerHTML = '';
    const profile = new Profile(mainContentElement);
    profile.render();
}