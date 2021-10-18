import {Block} from "../../util/block";
import template from "./profileEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {render} from "../../../index";
import {Input} from "../../components/Input/input";
import {FormProfileEdit} from "../../components/FormProfileEdit/formProfileEdit";
import {ChatsPage} from "../chats/chats";
import {Router} from "../../util/router";

export class ProfileEditPage extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        const formProfileEdit = new FormProfileEdit( {
            classNames: ["form"],
            id: "formData",
            name: "formData",
            buttonSave: new Button( {
                text: "Сохранить",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["profile__button"],
            }),
            buttonChange: new Button( {
                text: "Поменять",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["profile__button"],
            }),
            inputEmail: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "userEmail",
                type: "email",
                name: "email",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "pochta@yandex.ru",
            }),
            inputLogin: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "userLogin",
                type: "text",
                name: "login",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "ivanivanov",
            }),
            inputFirstName: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newFirstName",
                type: "text",
                name: "first_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Иван",
            }),
            inputSecondName: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newSecondName",
                type: "text",
                name: "second_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Иванов",
            }),
            inputDisplayName: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newDisplayName",
                type: "text",
                name: "display_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Иван",
            }),
            inputPhone: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "tel",
                type: "phone",
                name: "phone_name",
                minlength: 11,
                maxlength: 18,
                required: "",
                placeholder: "+79099673030",
            })
        });
        const buttonBack = new Button( {
            text: "←",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/profile');
                }
            },
            classNames: ["profile__button-back"],
        });
        return compile(template,{
            buttonBack: buttonBack,
            formProfileEdit: formProfileEdit,
        });
    }

    sendData(e) {
        e.preventDefault();
        const userEmail = document.querySelector('#userEmail');
        console.log('email', userEmail.value);

        const userLogin = document.querySelector('#userLogin');
        console.log('login', userLogin.value);

        const firstName = document.querySelector('#newFirstName');
        console.log('firstName', firstName.value);

        const secondName = document.querySelector('#newSecondName');
        console.log('firstName', secondName.value);

        const displayName = document.querySelector('#newDisplayName');
        console.log('displayName', displayName.value);

        const phone = document.querySelector('#tel');
        console.log('phone', phone.value);
    }
}

