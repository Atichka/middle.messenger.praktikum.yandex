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
        return compile(template,{
            buttonLogin: buttonLogin,
            buttonSignin: buttonSignin,
        });
    }
}
