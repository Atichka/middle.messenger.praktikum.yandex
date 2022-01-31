import {Block, TProps} from "@/util/block";
import template from "./login.pug";
import {Button} from "@/components/Button/button";
import {compile} from "@/util/compile";
import {Input} from "@/components/Input/input";
import {FormLogin} from "@/components/FormLogin/formLogin";
import {Router} from "@/util/router";
import {LoginData} from "@/api/AuthAPI";
import AuthController from "@/controllers/AuthController";

export class LoginPage extends Block<TProps> {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const formLogin = new FormLogin( {
            classNames: ["form"],
            id: "formlogin",
            name: "formlogin",
            buttonLogin: new Button( {
                text: "Авторизоваться",
                events: {
                    click: (e: any) => this.sendData(e),
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
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
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
                    blur: (e: any) => this.onBlur(e),
                    focus: (e: any) => this.onFocus(e),
                },
            }),
            buttonSignin: new Button( {
                text: "Нет аккаунта?",
                events: {
                    click: () => {
                        const router = new Router();
                        router.go('/sign-up');
                    },
                },
                classNames: ["form__signup-button"],
            }),
        });
        return compile(template,{
            formLogin: formLogin,
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
        let regexp = /\w+/;
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
        const data: LoginData = {};
        const form = document.querySelector('.form');
        // @ts-ignore
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
            await AuthController.login(data);
            const router = new Router();
            router.go('/messenger');
        }
    }

}
