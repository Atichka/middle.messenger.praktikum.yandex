import {Block} from "../../util/block";
import template from "./chats.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {FormChats} from "../../components/FormChats/formChats";
import {Input} from "../../components/Input/input";

export class ChatsPage extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        const formChats = new FormChats( {
            classNames: ["send-form"],
            id: "formmessage",
            name: "formmessage",
            buttonChats: new Button( {
                text: "→",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["send-form__button-send"],
            }),
            inputMessage: new Input( {
                classNames: ["send-form__input"],
                id: "message",
                type: "text",
                name: "message",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Сообщение",
                events: {
                    blur: (e) => this.onBlur(e),
                    focus: (e) => this.onFocus(e),
                },
            }),
        });
        return compile(template,{
            formChats: formChats,
        });
    }

    onBlur(event) {
        const input = event.target;
        const name = input.name;
        const span = this._element.querySelector(`#error-${name}`);
        if(input.value.length > 0) {
            span.classList.add("error-hide");
        } else {
            span.classList.remove('error-hide');
        }
    }

    onFocus(event) {
        const input = event.target;
        const name = input.name;
        const span = this._element.querySelector(`#error-${name}`);
        span.classList.add("error-hide");
    }

    sendData(e) {
        e.preventDefault();
        const input = document.querySelector('.send-form__input');
        const name = input.name;
        const span = this._element.querySelector(`#error-${name}`);
        if(input.value.length > 0) {
            span.classList.add("error-hide");
            console.log("Message: ", input.value);
        } else {
            span.classList.remove('error-hide');
        }
    }
}

