import IView from "../IView/IView"
import profileTemplate from  "./ProfileView.hbs"
import "./ProfileView.css"
import profileUserTemplate from "../../Components/ProfileUser/ProfileUser.hbs"
import profileViewConfig from "./ProfileViewConfig";
import "./ProfileView.css"
import "../../Components/ProfileUser/ProfileUser.css"

class ProfileView extends IView{
    constructor(parent : HTMLElement) {
        super(parent, profileTemplate(profileViewConfig), '.profile__container');
    }

    public bindClick(callback: Function): void { 
        this.element.addEventListener('click', callback.bind(this));
    }

    public show(opts?: any): void {
        const userField = this.element.querySelector('.profile__user');
        if(!userField){ return; }
        userField.innerHTML = profileUserTemplate(opts);
        this.parent.appendChild(this.element);
    }
}

export default ProfileView;