import {Block} from "../../util/block"
import template from "./chats.pug"
import {Button} from "../../components/Button/button"
import {compile} from "../../util/compile"
import {FormChats} from "../../components/FormChats/formChats"
import {Input} from "../../components/Input/input"
import {Router} from "../../util/router"
import {Link} from "../../components/Link/link"
import ChatsController from "../../controllers/ChatsController";

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
        const buttonMenu = new Button( {
            events: {
                click: (e) => this.openMenu(),
            },
            classNames: ["header__menu"],
        });
        const buttonOpenModalAddChat = new Button( {
            text: '+',
            events: {
                click: () => this.openModalAddChat(),
            },
            classNames: ["page__add"],
        });
        const buttonAddChat = new Button( {
            text: 'Создать',
            events: {
                click: (e) => this.addChat(e),
            },
            classNames: ["popup__button", "background-blue"],
        });
        const linkProfile = new Link( {
            text: 'Профиль &#62;',
            href: '/profile',
            classNames: ["page__link"],
        });
        return compile(template,{
            formChats: formChats,
            buttonMenu: buttonMenu,
            linkProfile: linkProfile,
            buttonOpenModalAddChat: buttonOpenModalAddChat,
            buttonAddChat: buttonAddChat,
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
    openMenu() {
        const menu: any = document.querySelector(".menu")
        menu.classList.toggle('hide');
    }
    openModalAddChat() {
        const popup: any = document.querySelector('.popup');
        popup.classList.toggle('hide');
    }
    addChat(e) {
        e.preventDefault();
        const input: any = document.querySelector('.popup__input');
        if(input.value) {
            const popup: any = document.querySelector('.popup');
            let obj: Record<string, unknown> = {};
            obj['title'] = input.value
            ChatsController.chats(obj)
            input.value = '';
            popup.classList.toggle('hide');
        }
    }
}

