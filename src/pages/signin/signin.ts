import {Block} from "../../util/block";
import template from "./signin.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";

export class SigninPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonSignin = new Button( {
            text: "Зарегистрироваться",
            events: {
                click: () => sendData(),
            },
            classNames: ["form__button", "form__top-signin"]
        });
        const inputEmail = new Input( {
            classNames: ["form__input"],
            id: "userEmail",
            type: "text",
            name: "email",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "Email",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputLogin = new Input( {
            classNames: ["form__input"],
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
        const inputName = new Input( {
            classNames: ["form__input"],
            id: "newName",
            type: "text",
            name: "first_name",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "Имя",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputSecondName = new Input( {
            classNames: ["form__input"],
            id: "newSecondName",
            type: "text",
            name: "second_name",
            minlength: 2,
            maxlength: 30,
            required: "",
            placeholder: "Фамилия",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputTel = new Input( {
            classNames: ["form__input"],
            id: "phone",
            type: "tel",
            name: "phone",
            minlength: 11,
            maxlength: 18,
            required: "",
            placeholder: "+7 (909) 967 30 30",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputPassword = new Input( {
            classNames: ["form__input"],
            id: "userPassword",
            type: "password",
            name: "password",
            required: "",
            placeholder: "Пароль",
            events: {
                focus: () => onFocus(this),
            },
        });
        const inputPasswordRepeat = new Input( {
            classNames: ["form__input"],
            id: "userPasswordRepeat",
            type: "password",
            name: "passwordRepeat",
            required: "",
            placeholder: "Пароль",
            events: {
                focus: () => onFocus(this),
            },
        });
        return compile(template,{
            buttonSignin: buttonSignin,
            inputEmail: inputEmail,
            inputLogin: inputLogin,
            inputName: inputName,
            inputSecondName: inputSecondName,
            inputTel: inputTel,
            inputPassword: inputPassword,
            inputPasswordRepeat: inputPasswordRepeat,
        });
    }
}

const validations = {
    password: /\w+/,
    text: /\w+/,
    email: /^\S+@\S+$/i,
    tel: /([\+]\d{1}\s?[\(]?\d{3}[\)]?\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2})|(8\d{10})$/,
};

function sendData(form) {
    const formData: any = new FormData(form);
    const obj: Record<string, unknown> = {};
    for (const [name, value] of formData) {
        obj[name] = value;
    }

    // Валидация
    let isErrors = false;

    const fields = document.querySelectorAll('.form__field-name');
    for (const field of fields) {
        const input = <HTMLInputElement>field.querySelector('input');
        const isValid = validateInput(input, field);
        if (!isValid) {
            isErrors = true;
        }
    }

    if (!isErrors) {
        for (const [name, value] of formData) {
            console.log(`${name}: ${value}`);
        }
    }
}

function addBlurFocusListener(field) {
    const input = field.querySelector('.form__input');
    input.addEventListener("focus", () => onFocus(input));
    input.addEventListener("blur", e => onBlur(e, field));
}

function onFocus(input) {
    input.classList.remove('field-error');
}

function onBlur(event, field) {
    validateInput(event.target, field);
}

function validateInput(input, field) {
    const type = input.type;
    const value = input.value;

    let regexp = /\w+/;
    if (type in validations) {
        regexp = validations[type];
    }

    const isValid = regexp.test(value);
    if (!isValid) {

        field.classList.add("field-error");
        return false;
    }
    return true;
}

window.sendData = sendData
window.addBlurFocusListener = addBlurFocusListener

