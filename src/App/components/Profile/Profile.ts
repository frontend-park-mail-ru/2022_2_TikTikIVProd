import IComponent from "../IComponent/IComponent.js";

export default class Feed extends IComponent {

    // private onSubmitForm() ;
    constructor(parent: HTMLElement) {
        super(parent);
    }

    render() {
        const mainElement = document.createElement('div');
        const div = document.createElement('div');
        mainElement.appendChild(div);
        div.innerText = "PROFILE WILL BE APPEND IN THE NEXT UPDATES!";

        return mainElement;
    }
};
