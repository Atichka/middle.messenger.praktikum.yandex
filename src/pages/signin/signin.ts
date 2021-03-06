import {Block, TProps} from "@/util/block";
import template from './signin.pug';
import {Button} from "@/components/Button/button";
import {compile} from "@/util/compile";
import {Input} from "@/components/Input/input";
import {FormSignin} from "@/components/FormSignin/formSignin";
import {Router} from '@/util/router';
import AuthController from "@/controllers/AuthController";
import {SignupData} from "@/api/AuthAPI";

export class SigninPage extends Block<TProps> {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        const formSignin = new FormSignin( {
            classNames: ["form"],
            id: "formlogin",
            name: "formsignin",
            inputEmail: new Input({
                classNames: ["form__input"],
                id: "userEmail",
                type: "email",
                name: "email",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Email",
                events: {
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
                },
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
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
                },
            }),
            inputName: new Input( {
                classNames: ["form__input"],
                id: "newName",
                type: "text",
                name: "first_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Имя",
                events: {
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
                },
            }),
            inputSecondName: new Input( {
                classNames: ["form__input"],
                id: "newSecondName",
                type: "text",
                name: "second_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Фамилия",
                events: {
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
                },
            }),
            inputTel: new Input( {
                classNames: ["form__input"],
                id: "phone",
                type: "tel",
                name: "phone",
                minlength: 11,
                maxlength: 18,
                required: "",
                placeholder: "+7 (909) 967 30 30",
                events: {
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
                },
            }),
            inputPassword: new Input( {
                classNames: ["form__input"],
                id: "userPassword",
                type: "password",
                name: "password",
                required: "",
                placeholder: "Пароль",
            }),
            inputPasswordRepeat: new Input( {
                classNames: ["form__input"],
                id: "userPasswordRepeat",
                type: "password",
                name: "passwordRepeat",
                required: "",
                placeholder: "Пароль",
            }),
            buttonSignin: new Button( {
                text: "Зарегистрироваться",
                events: {
                    click: (e: any) => this.sendData(e),
                },
                classNames: ["form__button", "form__top-signin"],
            }),
            buttonLogin: new Button( {
                text: "Войти",
                events: {
                    click: () => {
                        const router = new Router();
                        router.go('/login');
                    }
                },
                classNames: ["form__signup-button"],
            }),
        });
        return compile(template,{
            formSignin: formSignin,
        });
    }

    validateInput(input: any) {
        const name = input.name;
        const type = input.type;
        const value = input.value;
        const validations = {
            password: /\w+/,
            text: /\w+/,
            email: /^\S+@\S+$/i,
            tel: /([\+]\d{1}\s?[\(]?\d{3}[\)]?\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2})|(8\d{10})$/,
        };

        const span: any = this._element.querySelector(`#error-${name}`);
        let regexp: any = /\w+/;
        if (type in validations) {
            // @ts-ignore
            regexp = validations[type];
        }

        const isValid = regexp.test(value);
        if (isValid) {
            span.classList.add("error-hide");
            return true;
        }
        span.classList.remove('error-hide');
        return false;

    }

    onFocus(event: any) {
        const input = event.target;
        const name = input.name;
        const span: any = this._element.querySelector(`#error-${name}`);
        span.classList.add("error-hide");
    }

    onBlur(event: any) {
        const input = event.target;
        this.validateInput(input);
    }

    async sendData(e: any) {
        e.preventDefault();
        // @ts-ignore
        const data: SignupData = {};
        const inputPassword: any = document.querySelector('#userPassword');
        const inputPasswordRepeat: any = document.querySelector('#userPasswordRepeat');
        const name = inputPasswordRepeat.name;
        const spanPasswordRepeat: any = this._element.querySelector(`#error-${name}`);

        if(inputPassword.value === inputPasswordRepeat.value) {
            spanPasswordRepeat.classList.add("error-hide");
            const form = document.querySelector('.form');
            // @ts-ignore
            const formData: any = new FormData(form);
            const obj: Record<string, unknown> = {};
            for (const [name, value] of formData) {
                obj[name] = value;
            }

            // Валидация
            let isErrors = false;

            const fields = document.querySelectorAll('.form__field');
            for (const field of fields) {
                const input = <HTMLInputElement>field.querySelector('input');
                const isValid = this.validateInput(input);
                if (!isValid) {
                    isErrors = true;
                }
            }

            if (!isErrors) {
                for (const [name, value] of formData) {
                    // @ts-ignore
                    data[name] = value;
                }
                await AuthController.signup(data);
                const router = new Router();
                router.go('/');
            }

        } else {
            spanPasswordRepeat.classList.remove('error-hide');
        }
    }
}

