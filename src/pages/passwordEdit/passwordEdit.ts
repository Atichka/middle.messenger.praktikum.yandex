import {Block} from "../../util/block";
import template from "./passwordEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";
import {FormPasswordEdit} from "../../components/FormPasswordEdit/formPasswordEdit";
import {Router} from "../../util/router";
import {Image} from "../../components/Image/image";
import store from "../../util/store";
import UserController from "../../controllers/UserController";
import UsersController from "../../controllers/UsersController";

export class PasswordEditPage extends Block {
    constructor() {
        super('div');
        UserController.getDataUser().then(user => this.setProps({ user: user }));
    }

    public render(): DocumentFragment {
        const state = store.getState();
        const imageAvatar = new Image({
            classNames: ["profile__button-pic"],
            src: state.user ? state.user.avatar : '',
            id: "userAvatar",
        });
        const formPasswordEdit = new FormPasswordEdit( {
            classNames: ["form"],
            id: "formPassword",
            name: "formPassword",
            buttonSave: new Button( {
                text: "Сохранить",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["profile__button"],
            }),
            inputOldPassword: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "oldPassword",
                type: "password",
                name: "oldPassword",
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
                click: () => {
                    const router = new Router();
                    router.go('/profile');
                }
            },
            classNames: ["profile__button-back"],
        });
        return compile(template,{
            formPasswordEdit: formPasswordEdit,
            buttonBack: buttonBack,
            imageAvatar: imageAvatar,
        });
    }

    async getDataUser() {
        await UserController.getDataUser();
    }

    sendData(e) {
        e.preventDefault();
        const inputNewPassword = document.querySelector('#newPassword');
        const inputNewPasswordRepeat = document.querySelector('#newPasswordRepeat');
        const inputOldPassword = document.querySelector('#oldPassword');
        const spanOldPassword = this._element.querySelector(`#error-oldPassword`);
        const name = inputNewPasswordRepeat.name;
        const spanNewPasswordRepeat = this._element.querySelector(`#error-${name}`);
        if(inputNewPassword.value && inputNewPasswordRepeat.value && inputOldPassword.value) {
            if(inputNewPassword.value === inputNewPasswordRepeat.value) {
                spanNewPasswordRepeat.classList.add("error-hide");
                spanOldPassword.classList.add("error-hide");
                const form: any = document.forms[0];
                const formData: any = new FormData(form);
                let obj: Record<string, unknown> = {};
                for (let [name, value] of formData) {
                    obj[name] = value;
                }
                console.log(obj);
                UsersController.passwordEdit(obj);
            } else {
                spanNewPasswordRepeat.classList.remove('error-hide');
                spanOldPassword.classList.add("error-hide");
            }

        } else {
            spanNewPasswordRepeat.classList.add('error-hide');
            spanOldPassword.classList.remove("error-hide");
        }
    }
}

