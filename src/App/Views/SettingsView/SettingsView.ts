import IView from "../IView/IView"
import settingsViewTemplate from "./SettingsView.hbs"
import settingsFormTemplate from "../../Components/SettingsForm/SettingsForm.hbs"
import settingsViewConfig from "./SettingsViewConfig";

import "./SettingsView.css"
import "../../Components/SettingsForm/SettingsForm.css"

class SettingsView extends IView{
    constructor(parent : HTMLElement) {
        super(parent, settingsViewTemplate({}), '.settings__container');
    }

    public show(opts?: any): void {
        // TODO avatar upload;
        this.element.innerHTML = '';
        //
        this.element.innerHTML += settingsFormTemplate({data: opts, config: settingsViewConfig});

        this.parent.appendChild(this.element);
    }

    public bindClick(callback: Function) : void {
        this.element.addEventListener('click', callback.bind(this));
    }
}

export default SettingsView;