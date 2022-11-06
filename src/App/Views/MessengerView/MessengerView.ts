import IView from "../IView/IView";
import messengerViewTemplate from "./MessengerView.hbs"
import "./MessengerView.css"

import messageCreateTemplate from "../../Components/MessageCreate/MessageCreate.hbs"
import "../../Components/MessageCreate/MessageCreate.css"

import messageTemplate from "../../Components/Message/Message.hbs"
import "../../Components/Message/Message.css"

class MessengerView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, messengerViewTemplate({}), '.messenger');   
        
        const elem = this.element.querySelector('.messenger__footer');
        if(!elem) {return;} 
        elem.innerHTML +=  messageCreateTemplate({});

        const msgs = this.element.querySelector('.messenger__content');
        if(!msgs)
        {return;}
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
        msgs.innerHTML += messageTemplate({});
    }
}

export default MessengerView; 