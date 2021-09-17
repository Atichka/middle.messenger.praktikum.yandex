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
                click: () => sendData(),
            },
            classNames: ["send-form__button-send"]
        });
        return compile(template,{
            buttonChats: buttonChats,
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
