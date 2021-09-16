import {Block} from "../../util/block";
import template from "./signin.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";

export class SigninPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonSignin = new Button( {
            text: "Зарегистрироваться",
            events: {
                click: () => console.log("signin")
            },
        });
        return compile(template,{
            buttonSignin: buttonSignin,
        });
    }
}

