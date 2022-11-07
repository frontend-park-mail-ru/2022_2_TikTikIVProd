import IView from "../IView/IView";
import messengerViewTemplate from "./MessengerView.hbs"
import "./MessengerView.scss"

import messageCreateTemplate from "../../Components/MessageCreate/MessageCreate.hbs"
import "../../Components/MessageCreate/MessageCreate.scss"

import messageTemplate from "../../Components/Message/Message.hbs"
import "../../Components/Message/Message.scss"

import chatNavbarTemplate from "../../Components/ChatNavbar/ChatNavbar.hbs"
import "../../Components/ChatNavbar/ChatNavbar.scss"

class MessengerView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, messengerViewTemplate({}), '.messenger');   
        
        
        const nav = this.element.querySelector('.messenger__navbar');
        if(!nav) {return;} 
        nav.innerHTML +=  chatNavbarTemplate({});


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