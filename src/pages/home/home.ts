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
        const buttonProfileEdit = new Button( {
            text: "profile edit",
            events: {
                click: () => renderTemplate('profileEdit')
            },
        });
        const buttonPasswordEdit = new Button( {
            text: "password edit",
            events: {
                click: () => renderTemplate('passwordEdit')
            },
        });
        const buttonError404 = new Button( {
            text: "error 404",
            events: {
                click: () => renderTemplate('error404')
            },
        });
        const buttonError500 = new Button( {
            text: "error 500",
            events: {
                click: () => renderTemplate('error500')
            },
        });
        return compile(template,{
            buttonLogin: buttonLogin,
            buttonSignin: buttonSignin,
            buttonChats: buttonChats,
            buttonProfile: buttonProfile,
            buttonProfileEdit: buttonProfileEdit,
            buttonPasswordEdit: buttonPasswordEdit,
            buttonError404: buttonError404,
            buttonError500: buttonError500,
        });
    }
}
