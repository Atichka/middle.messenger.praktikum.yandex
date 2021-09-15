import {Block} from "../../util/block"
import template from "./home.pug"
import {Button} from "../../components/Button/button"
import {compile} from "../../util/compile";
import {renderTemplate} from "../../tpl/index";

export class HomePage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonLogin = new Button( {
            text: "login",
            events: {
                click: () => renderTemplate('login')
            },
        });
        const buttonSignin = new Button( {
            text: "signin",
            events: {
                click: () => renderTemplate('signin')
            },
        });
        const buttonChats = new Button( {
            text: "chats",
            events: {
                click: () => renderTemplate('chats')
            },
        });
        const buttonProfile = new Button( {
            text: "profile",
            events: {
                click: () => renderTemplate('profile')
            },
        });
        return compile(template,{
            buttonLogin: buttonLogin,
            buttonSignin: buttonSignin,
            buttonChats: buttonChats,
            buttonProfile: buttonProfile,
        });
    }
}
