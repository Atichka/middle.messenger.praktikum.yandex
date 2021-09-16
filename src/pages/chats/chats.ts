import {Block} from "../../util/block";
import template from "./chats.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";

export class ChatsPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonChats = new Button( {
            text: "→",
            events: {
                click: () => console.log("chats")
            },
        });
        return compile(template,{
            buttonChats: buttonChats,
        });
    }
}

