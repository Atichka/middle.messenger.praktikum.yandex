import {Block, TProps} from "@/util/block";
import template from "./chats.pug";
import {Button} from "@/components/Button/button";
import {compile} from "@/util/compile";
import {FormChats} from "@/components/FormChats/formChats";
import {Input} from "@/components/Input/input";
import {Link} from "@/components/Link/link";
import {List} from "@/components/List/list";
import ChatsController from "@/controllers/ChatsController";
import store from "@/util/store";
import {FormAddUserInChat} from "@/components/FormAddUserInChat/formAddUserInChat";
import {FormDeleteUserInChat} from "@/components/FormDeleteUserInChat/formDeleteUserInChat";
import {Chat} from "@/components/Chat/chat";
import {NotSelectChat} from "@/components/NotSelectChat/notSelectChat";

export class ChatsPage extends Block<TProps> {
    constructor() {
        super('div');
        // @ts-ignore
        ChatsController.getDataChats().then(chats => this.setProps({ chats: chats }));
        // @ts-ignore
        store.on('updated', () => this.eventBus().emit('flow:component-did-update'));
    }

    public render(): DocumentFragment {
        const state = store.getState();
        const listChats: [] = [];
        if(state.chats) {
            state.chats.forEach((chat: any) => {
                // @ts-ignore
                listChats.push(new List(chat));
            });
        }
        const messages = new Chat( {
            user: state.user,
            messages: state.currentChatId && state.messages ? state.messages[state.currentChatId] : [],
            buttonMenu: new Button( {
                events: {
                    click: () => this.openMenu(),
                },
                classNames: ["header__menu"],
            }),
            formChats: new FormChats( {
                classNames: ["send-form"],
                id: "formmessage",
                name: "formmessage",
                buttonChats: new Button( {
                    text: "→",
                    events: {
                        click: (e: any) => this.sendData(e),
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
                        blur: (e: any) => this.onBlur(e),
                        focus: (e: any) => this.onFocus(e),
                    },
                }),
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
                placeholder: "Введите id чата",
            }),
            inputIdUser: new Input( {
                classNames: ["popup__input"],
                id: "idUsers",
                type: "number",
                name: "users",
                min: 0,
                max: 30,
                placeholder: "Введите id пользователя",
            }),
            buttonAddUserInChat: new Button( {
                text: 'Добавить',
                events: {
                    click: (e: any) => this.getDataChat(e),
                },
                classNames: ["popup__button", "background-blue"],
            }),
            buttonCancel: new Button( {
                text: 'Отмена',
                events: {
                    click: () => this.openModalAddUserInChat(),
                },
                classNames: ["popup__button"]
            }),
        });
        const formDeleteUserInChat = new FormDeleteUserInChat({
            classNames: ["popup__form"],
            id: "formDeleteUserInChat",
            name: "formDeleteUserInChat",
            inputIdChat: new Input( {
                classNames: ["popup__input"],
                id: "chatId",
                type: "number",
                name: "chatId",
                min: 0,
                max: 30,
                placeholder: "Введите id чата",
            }),
            inputIdUser: new Input( {
                classNames: ["popup__input"],
                id: "idUsers",
                type: "number",
                name: "users",
                min: 0,
                max: 30,
                placeholder: "Введите id пользователя",
            }),
            buttonDeleteUserInChat: new Button( {
                text: 'Удалить',
                events: {
                    click: (e: any) => this.getDeleteUser(e),
                },
                classNames: ["popup__button", "background-blue"],
            }),
            buttonCancel: new Button( {
                text: 'Отмена',
                events: {
                    click: () => this.openModalDeleteUserInChat(),
                },
                classNames: ["popup__button"]
            }),
        })
        const buttonOpenModalAddChat = new Button( {
            text: '+',
            events: {
                click: () => this.openModalAddChat(),
            },
            classNames: ["page__button"],
        });
        const buttonOpenModalAddUserInChat = new Button( {
            text: '☺+',
            events: {
                click: () => this.openModalAddUserInChat(),
            },
            classNames: ["page__button"],
        });
        const buttonOpenModalDeleteUserInChat = new Button( {
            text: '☺-',
            events: {
                click: () => this.openModalDeleteUserInChat(),
            },
            classNames: ["page__button"],
        });
        const buttonAddChat = new Button( {
            text: 'Создать',
            events: {
                click: (e: any) => this.addChat(e),
            },
            classNames: ["popup__button", "background-blue"],
        });
        const linkProfile = new Link( {
            text: 'Профиль &#62;',
            href: '/profile',
            classNames: ["page__link"],
        });
        const notSelectChat = new NotSelectChat( {
            text: 'Выберите чат чтобы отправить сообщение',
            classNames: ["page__not-chat"],
        });
        return compile(template,{
            formAddUserInChat: formAddUserInChat,
            formDeleteUserInChat: formDeleteUserInChat,
            linkProfile: linkProfile,
            listChats: listChats,
            showMessages: state.currentChatId ? messages : notSelectChat,
            buttonOpenModalAddChat: buttonOpenModalAddChat,
            buttonAddChat: buttonAddChat,
            buttonOpenModalAddUserInChat: buttonOpenModalAddUserInChat,
            buttonOpenModalDeleteUserInChat: buttonOpenModalDeleteUserInChat,
            chats: state.chats ? state.chats : '',
            user: state.user ? state.user : '',
        });
    }

    onBlur(event: any) {
        const input = event.target;
        const name = input.name;
        const span: any = this._element.querySelector(`#error-${name}`);
        if(input.value.length > 0) {
            span.classList.add("error-hide");
        } else {
            span.classList.remove('error-hide');
        }
    }

    onFocus(event: any) {
        const input = event.target;
        const name = input.name;
        const span: any = this._element.querySelector(`#error-${name}`);
        span.classList.add("error-hide");
    }

    sendData(e: any) {
        e.preventDefault();
        const input: any = document.querySelector('.send-form__input');
        const name = input.name;
        const span: any = this._element.querySelector(`#error-${name}`);
        if(input.value.length > 0) {
            span.classList.add("error-hide");
            ChatsController.sendMessage(store.getState().currentChatId, input.value);
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
    openModalDeleteUserInChat() {
        const popupDeeleteUser: any = document.querySelector('.popup__delete-user');
        popupDeeleteUser.classList.toggle('hide');
    }
    addChat(e: any) {
        e.preventDefault();
        const input: any = document.querySelector('.popup__input');
        if(input.value) {
            const popupAddChat: any = document.querySelector('.popup__add-chat');
            let obj: Record<string, unknown> = {};
            obj['title'] = input.value;
            // @ts-ignore
            ChatsController.chats(obj);
            input.value = '';
            popupAddChat.classList.toggle('hide');
        }
    }
    getDataChat(e: any) {
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
        // @ts-ignore
        ChatsController.addUserInChat(obj);
    }
    getDeleteUser(e: any) {
        e.preventDefault();
        const form: any = document.forms[4];
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
        // @ts-ignore
        ChatsController.deleteUserInChat(obj);
    }
}


