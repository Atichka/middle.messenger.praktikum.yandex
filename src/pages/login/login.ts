import {Block} from "../../util/block";
import template from "./login.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";
import {Form} from "../../components/Form/form"

const forms: HTMLFormElement[] = Array.from(document.forms);
const form = document.querySelector('.form');

export class LoginPage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const formLogin = new Form( {
            classNames: ["form"],
            id: "formlogin",
            name: "formlogin",
            buttonLogin: new Button( {
                text: "Авторизоваться",
                events: {
                    click: (e) => sendData(e),
                },
                classNames: ["form__button", "form__top-login"],
            }),
            inputLogin: new Input( {
                classNames: ["form__input"],
                id: "userLogin",
                type: "text",
                name: "login",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "ivanivanov",
                events: {
                    // blur: this.validateInput.bind(this),
                    // focus: () => onFocus.bind(this),
                    focus: (e) => this.onFocus(e),
                },
            }),
            inputPassword: new Input( {
                classNames: ["form__input"],
                id: "userPassword",
                type: "password",
                name: "password",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "пароль",
                events: {
                    // blur: this.validateInput.bind(this),
                    // focus: () => onFocus.bind(this),
                    focus: (e) => this.onFocus(e),
                    blur: (e) => this.onBlur(e),
                },
            }),
        });
        return compile(template,{
            formLogin: formLogin,
        });
    }

    validateInput(event) {
        const input = event.target;
        const type = input.type;
        const value = input.value;

        const span = this._element.querySelector('#error-login');
        let regexp = /\w+/;
        if (type in validations) {
            regexp = validations[type];
        }

        const isValid = regexp.test(value);
        if (!isValid) {

            span.classList.add("error-hide");
            return true;
        }
        return false;
    }

    onFocus(event) {
        const input = event.target;
        // console.log('input', input.parentElement);
        // const span = this._element.querySelector('.error')
        // span.classList.remove('error-hide');
        input.classList.remove('field-error');
    }

    onBlur(event) {
        const input = event.target;
        this.validateInput(input, input.parentElement);
    }

    validateInput(input, field) {
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
}

const validations = {
    password: /\w+/,
    text: /\w+/,
    email: /^\S+@\S+$/i,
    tel: /([\+]\d{1}\s?[\(]?\d{3}[\)]?\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2})|(8\d{10})$/,
};

// function sendData(e) {
//     e.preventDefault();
//     const form = document.querySelector('.form');
//     const formData: any = new FormData(form);
//     const obj: Record<string, unknown> = {};
//     for (const [name, value] of formData) {
//         obj[name] = value;
//     }
//
//     // Валидация
//     let isErrors = false;
//
//     const fields = document.querySelectorAll('.form__field-name');
//     for (const field of fields) {
//         const input = <HTMLInputElement>field.querySelector('input');
//         const isValid = validateInput(input, field);
//         if (!isValid) {
//             isErrors = true;
//         }
//     }
//
//     if (!isErrors) {
//         for (const [name, value] of formData) {
//             console.log(`${name}: ${value}`);
//         }
//     }
// }

// function onFocus() {
//     // console.log('this', this);
//     // const span = this._element.querySelector('#error-login')
//     // console.log('span', span);
//     // span.classList.remove('error-hide');
//     console.log('this._element', this);
//     // input.classList.remove('field-error');
// }

// function onBlur(event) {
//     const input = event.target;
//     const type = input.type;
//     const value = input.value;
//     const span = this._element.querySelector('#error-login')
//     let regexp = /\w+/;
//     if (type in validations) {
//         regexp = validations[type];
//     }
//     const isValid = regexp.test(value);
//     if (!isValid) {
//
//         span.classList.add("error-hide");
//         return false;
//     }
//     return true;
//
//     // validateInput(event.target, span);
// }


//
// window.sendData = sendData
// window.addBlurFocusListener = addBlurFocusListener

// const validations = {
//     password: /\w+/,
//     text: /\w+/,
//     email: /^\S+@\S+$/i,
//     tel: /([\+]\d{1}\s?[\(]?\d{3}[\)]?\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2})|(8\d{10})$/,
// };
//
// function sendData(form) {
//     const formData: any = new FormData(form);
//     const obj: Record<string, unknown> = {};
//     for (const [name, value] of formData) {
//         obj[name] = value;
//     }
//
//     // Валидация
//     let isErrors = false;
//
//     const fields = document.querySelectorAll('.form__field-name');
//     for (const field of fields) {
//         const input = <HTMLInputElement>field.querySelector('input');
//         const isValid = validateInput(input, field);
//         if (!isValid) {
//             isErrors = true;
//         }
//     }
//
//     if (!isErrors) {
//         for (const [name, value] of formData) {
//             console.log(`${name}: ${value}`);
//         }
//     }
// }
//
// function addBlurFocusListener(field) {
//     const input = field.querySelector('.form__input');
//     input.addEventListener("focus", () => onFocus(input));
//     input.addEventListener("blur", e => onBlur(e, field));
// }
//
// function onFocus(input) {
//     input.classList.remove('field-error');
// }
//
// function onBlur(event, field) {
//     validateInput(event.target, field);
// }
//
// function validateInput(input, field) {
//     const type = input.type;
//     const value = input.value;
//
//     let regexp = /\w+/;
//     if (type in validations) {
//         regexp = validations[type];
//     }
//
//     const isValid = regexp.test(value);
//     if (!isValid) {
//
//         field.classList.add("field-error");
//         return false;
//     }
//     return true;
// }
