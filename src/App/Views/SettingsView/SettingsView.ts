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

    public getDataFromGroup(child: HTMLElement): Map<string, string> { 
        const data = new Map();
        child.closest('.group')?.querySelectorAll('input').forEach((item) =>{
            data.set(item.id, item.value);
        });
        return data;
    }

    public showErrorMsg(id: string, msg: string) : void {
        const inpt = <HTMLElement>this.element.querySelector('#'+id);
        const msgField = <HTMLElement>this.element.querySelector('#'+id+'-msg');
        if(!inpt || !msgField){
            return;
        }
        inpt.classList.add('invalid');
        msgField.innerText = msg;
        msgField.style.visibility = 'visible';
    }

    public hideErrorMsg(id: string, msg: string) : void {
        const inpt = <HTMLElement>this.element.querySelector('#'+id);
        const msgField = <HTMLElement>this.element.querySelector('#'+id+'-msg');
        if(!inpt || !msgField){
            return;
        }
        inpt.classList.remove('invalid');
        msgField.innerText = '';
        msgField.style.visibility = 'hidden';
    }
}

export default SettingsView;