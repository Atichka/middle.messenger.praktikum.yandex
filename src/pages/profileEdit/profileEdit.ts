import {Block} from "../../util/block";
import template from "./profileEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";

export class ProfileEditPage extends Block {
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
        const buttonChange = new Button( {
            text: "Поменять",
            events: {
                click: () => console.log("buttonChange")
            },
            classNames: ["profile__button"]
        });
        const inputEmail = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "userEmail",
            type: "email",
            name: "email",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "pochta@yandex.ru",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputLogin = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "userLogin",
            type: "text",
            name: "login",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "ivanivanov",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputFirstName = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "newFirstName",
            type: "text",
            name: "first_name",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "Иван",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputSecondName = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "newSecondName",
            type: "text",
            name: "second_name",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "Иванов",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputDisplayName = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "newDisplayName",
            type: "text",
            name: "display_name",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "Иван",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputPhone = new Input( {
            classNames: ["profile__input", "text__grey", "profile__text"],
            id: "tel",
            type: "phone",
            name: "display_name",
            minlength: 11,
            maxlength: 18,
            required: "",
            placeholder: "+79099673030",
            events: {
                focus: () => onFocus(this),
            },
        });
        return compile(template,{
            buttonSave: buttonSave,
            buttonBack: buttonBack,
            buttonChange: buttonChange,
            inputEmail: inputEmail,
            inputLogin: inputLogin,
            inputFirstName: inputFirstName,
            inputSecondName: inputSecondName,
            inputDisplayName: inputDisplayName,
            inputPhone: inputPhone,
        });
    }
}

