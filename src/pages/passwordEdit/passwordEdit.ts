import {Block} from "../../util/block";
import template from "./passwordEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {render} from "../../../index";
import {Input} from "../../components/Input/input";
import {FormPasswordEdit} from "../../components/FormPasswordEdit/formPasswordEdit";
import {ChatsPage} from "../chats/chats";

export class PasswordEditPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const formPasswordEdit = new FormPasswordEdit( {
            classNames: ["form"],
            id: "formPassword",
            name: "formPassword",
            buttonSave: new Button( {
                text: "Сохранить",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["profile__button"]
            }),
            inputOldPassword: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "oldPassword",
                type: "password",
                name: "password",
                required: "",
                placeholder: "Пароль",
            }),
            inputNewPassword: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newPassword",
                type: "password",
                name: "newPassword",
                required: "",
                placeholder: "Пароль",
            }),
            inputNewPasswordRepeat: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newPasswordRepeat",
                type: "password",
                name: "newPasswordRepeat",
                required: "",
                placeholder: "Пароль",
            }),
        });
        const buttonBack = new Button( {
            text: "←",
            events: {
                click: () => render('#app', new ChatsPage())
            },
            classNames: ["profile__button-back"]
        });
        return compile(template,{
            formPasswordEdit: formPasswordEdit,
            buttonBack: buttonBack,
        });
    }

    sendData(e) {
        e.preventDefault();
        const inputNewPassword = document.querySelector('#newPassword');
        const inputNewPasswordRepeat = document.querySelector('#newPasswordRepeat');
        const inputOldPassword = document.querySelector('#oldPassword');
        const name = inputNewPasswordRepeat.name;
        const spanNewPasswordRepeat = this._element.querySelector(`#error-${name}`);
        if(inputNewPassword.value === inputNewPasswordRepeat.value) {
            spanNewPasswordRepeat.classList.add("error-hide");
        } else {
            spanNewPasswordRepeat.classList.remove('error-hide');
        }
        console.log(inputOldPassword.value);
        console.log(inputNewPassword.value);
        console.log(inputNewPasswordRepeat.value);
    }
}

