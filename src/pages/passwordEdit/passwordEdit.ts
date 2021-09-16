import {Block} from "../../util/block";
import template from "./passwordEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";

export class PasswordEditPage extends Block {
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
        const inputOldPassword = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "oldPassword",
            type: "password",
            name: "password",
            required: "",
            placeholder: "Пароль",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputNewPassword = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "newPassword",
            type: "password",
            name: "newPassword",
            required: "",
            placeholder: "Пароль",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputNewPasswordRepeat = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "newPasswordRepeat",
            type: "password",
            name: "newPasswordRepeat",
            required: "",
            placeholder: "Пароль",
            events: {
                focus: () => onFocus(this),
            },
        });
        return compile(template,{
            buttonSave: buttonSave,
            buttonBack: buttonBack,
            inputOldPassword: inputOldPassword,
            inputNewPassword: inputNewPassword,
            inputNewPasswordRepeat: inputNewPasswordRepeat,
        });
    }
}

