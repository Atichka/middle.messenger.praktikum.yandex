import {renderTemplate} from '../index'
import {Block} from "../../util/block";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import template from "../../pages/home/login.pug";
// @ts-ignore
const forms: HTMLFormElement[] = Array.from(document.forms);

export class LoginPage extends Block<any> {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const buttonLogin = new Button( {
            text: "Авторизоваться",
            events: {
                click: () => sendData(this)
            },
        });
        return compile(template,{
            buttonLogin: buttonLogin,
        });
    }
}

const loginLink = document.querySelector('.loginLink');
const validations = {
    password: /\w+/,
    text: /\w+/,
    email: /^\S+@\S+$/i,
    tel: /([\+]\d{1}\s?[\(]?\d{3}[\)]?\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2})|(8\d{10})$/,
};

// @ts-ignore
loginLink.addEventListener('click', () => {
    renderTemplate('login')
});

// @ts-ignore
function sendData(form: this | HTMLFormElement | undefined) {
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

function addBlurFocusListener(field: { querySelector: (arg0: string) => any; }) {
    const input = field.querySelector('.form__input');
    input.addEventListener("focus", () => onFocus(input));
    input.addEventListener("blur", (e: any) => onBlur(e, field));
}

function onFocus(input: any) {
    input.classList.remove('field-error');
}

function onBlur(event: any, field: any) {
    validateInput(event.target, field);
}

function validateInput(input: any, field: any) {
    const type = input.type;
    const value = input.value;

    let regexp = /\w+/;
    if (type in validations) {
        // @ts-ignore
        regexp = validations[type];
    }

    const isValid = regexp.test(value);
    if (!isValid) {

        field.classList.add("field-error");
        return false;
    }
    return true;
}
// @ts-ignore
window.sendData = sendData
// @ts-ignore
window.addBlurFocusListener = addBlurFocusListener
