import {Block} from "../../util/block";
import template from "./profile.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";

export class ProfilePage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonProfile = new Button( {
            text: "←",
            events: {
                click: () => console.log("profile")
            },
            classNames: ["profile__button-back"]
        });
        return compile(template,{
            buttonProfile: buttonProfile,
        });
    }
}

