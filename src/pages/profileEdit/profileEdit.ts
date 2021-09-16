import {Block} from "../../util/block";
import template from "./profileEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";

export class ProfileEditPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonSave = new Button( {
            text: "Сохранить",
            events: {
                click: () => console.log("buttonSave")
            },
            classNames: ["profile__button"]
        });
        const buttonBack = new Button( {
            text: "←",
            events: {
                click: () => console.log("buttonBack")
            },
            classNames: ["profile__button-back"]
        });
        const buttonChange = new Button( {
            text: "Поменять",
            events: {
                click: () => console.log("buttonChange")
            },
            classNames: ["profile__button"]
        });
        return compile(template,{
            buttonSave: buttonSave,
            buttonBack: buttonBack,
            buttonChange: buttonChange,
        });
    }
}

