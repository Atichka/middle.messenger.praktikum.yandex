import {Block} from "../../util/block"
import template from "./chats.pug"
import {Button} from "../../components/Button/button"
import {compile} from "../../util/compile"
import {FormChats} from "../../components/FormChats/formChats"
import {Input} from "../../components/Input/input"
import {Link} from "../../components/Link/link"
import ChatsController from "../../controllers/ChatsController";
import store from "../../util/store";
import {FormAddUserInChat} from "../../components/FormAddUserInChat/formAddUserInChat";

export class ChatsPage extends Block {
    constructor() {
        super('div');
        ChatsController.getDataChats().then(chats => this.setProps({ chats: chats }));
        store.on('updated', () => this.eventBus().emit('flow:component-did-update'));
    }

    public render(): DocumentFragment {
        const state = store.getState();
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
        const formAddUserInChat = new FormAddUserInChat({
            classNames: ["popup__form"],
            id: "formAddUserInChat",
            name: "formAddUserInChat",
            inputIdChat: new Input( {
                classNames: ["popup__input"],
                id: "chatId",
                type: "number",
                name: "chatId",
                min: 0,
                max: 30,
                required: "",
                placeholder: "Введите id чата",
            }),
            inputIdUser: new Input( {
                classNames: ["popup__input"],
                id: "idUsers",
                type: "number",
                name: "users",
                min: 0,
                max: 30,
                required: "",
                placeholder: "Введите id пользователя",
            }),
            buttonAddUserInChat: new Button( {
                text: 'Добавить',
                events: {
                    click: (e) => this.getDataChat(e),
                },
                classNames: ["popup__button", "background-blue"],
            }),
        })
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
            classNames: ["page__button"],
        });
        const buttonOpenModalAddUserInChat = new Button( {
            text: '✎',
            events: {
                click: () => this.openModalAddUserInChat(),
            },
            classNames: ["page__button"],
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
            formAddUserInChat: formAddUserInChat,
            buttonMenu: buttonMenu,
            linkProfile: linkProfile,
            buttonOpenModalAddChat: buttonOpenModalAddChat,
            buttonAddChat: buttonAddChat,
            buttonOpenModalAddUserInChat: buttonOpenModalAddUserInChat,
            chats: state.chats ? state.chats : '',
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
        const popupAddChat: any = document.querySelector('.popup__add-chat');
        popupAddChat.classList.toggle('hide');
    }
    openModalAddUserInChat() {
        const popupEditChat: any = document.querySelector('.popup__edit-chat');
        popupEditChat.classList.toggle('hide');
    }
    addChat(e) {
        e.preventDefault();
        const input: any = document.querySelector('.popup__input');
        if(input.value) {
            const popupAddChat: any = document.querySelector('.popup__add-chat');
            let obj: Record<string, unknown> = {};
            obj['title'] = input.value
            ChatsController.chats(obj)
            input.value = '';
            popupAddChat.classList.toggle('hide');
        }
    }
    getDataChat(e) {
        e.preventDefault();
        const form: any = document.forms[3];
        const formData: any = new FormData(form);
        let obj: Record<string, unknown> = {};
        for (let [name, value] of formData) {
                if (name!="chatId") {
                    obj[name] = [Number(value)];
                } else {
                    obj[name] = Number(value);
                }
        }
        console.log(obj);
        ChatsController.addUserInChat(obj);
    }
}

