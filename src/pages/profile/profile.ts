import {Block} from "../../util/block";
import template from "./profile.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {render} from "../../../index";
import {ChatsPage} from "../chats/chats";

export class ProfilePage extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        const buttonProfile = new Button( {
            text: "←",
            events: {
                click: () => render('#app', new ChatsPage()),
            },
            classNames: ["profile__button-back"]
        });
        return compile(template,{
            buttonProfile: buttonProfile,
        });
    }
}

