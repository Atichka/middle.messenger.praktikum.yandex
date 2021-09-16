import {Block} from "../../util/block";
import template from "./passwordEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";

export class PasswordEditPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonSave = new Button( {
            text: "Сохранить",
            events: {
                click: () => console.log("buttonSave")
            },
        });
        const buttonBack = new Button( {
            text: "←",
            events: {
                click: () => console.log("buttonBack")
            },
        });
        return compile(template,{
            buttonSave: buttonSave,
            buttonBack: buttonBack,
        });
    }
}

