import {Block} from "../../util/block";
import template from "./profileEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";
import {FormProfileEdit} from "../../components/FormProfileEdit/formProfileEdit";
import {Router} from "../../util/router";
import UserController from "../../controllers/UserController";
import store from "../../util/store";

export class ProfileEditPage extends Block {
    constructor() {
        super('div');
        UserController.getDataUser().then(user => this.setProps({ user: user }));
        store.on('updated', () => this.eventBus().emit('flow:component-did-update'));
    }

    public render(): DocumentFragment {
        const state = store.getState();
        if(state.user) {
            console.log('state', state.user.login);
        }

        const formProfileEdit = new FormProfileEdit( {
            classNames: ["form"],
            id: "formData",
            name: "formData",
            buttonSave: new Button( {
                text: "Сохранить",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["profile__button"],
            }),
            buttonChange: new Button( {
                text: "Поменять",
                events: {
                    click: (e) => this.sendData(e),
                },
                classNames: ["profile__button"],
            }),
            inputEmail: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "userEmail",
                type: "email",
                name: "email",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "pochta@yandex.ru",
                value: state.user ? state.user.email : ''
            }),
            inputLogin: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "userLogin",
                type: "text",
                name: "login",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "ivanivanov",
                value: state.user ? state.user.login : ''
            }),
            inputFirstName: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newFirstName",
                type: "text",
                name: "first_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Иван",
                value: state.user ? state.user.first_name : ''
            }),
            inputSecondName: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newSecondName",
                type: "text",
                name: "second_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Иванов",
                value: state.user ? state.user.second_name : ''
            }),
            inputDisplayName: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "newDisplayName",
                type: "text",
                name: "display_name",
                minlength: 2,
                maxlength: 30,
                required: "",
                placeholder: "Иван",
                value: state.user ? state.user.display_name : ''
            }),
            inputPhone: new Input( {
                classNames: ["profile__input", "text__grey", "profile__text"],
                id: "tel",
                type: "phone",
                name: "phone_name",
                minlength: 11,
                maxlength: 18,
                required: "",
                placeholder: "+79099673030",
                value: state.user ? state.user.phone : ''
            })
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
            buttonBack: buttonBack,
            formProfileEdit: formProfileEdit,
        });
    }

    async getDataUser() {
        await UserController.getDataUser();
    }

    sendData(e) {
        e.preventDefault();
        const userEmail = document.querySelector('#userEmail');
        console.log('email', userEmail.value);

        const userLogin = document.querySelector('#userLogin');
        console.log('login', userLogin.value);

        const firstName = document.querySelector('#newFirstName');
        console.log('firstName', firstName.value);

        const secondName = document.querySelector('#newSecondName');
        console.log('firstName', secondName.value);

        const displayName = document.querySelector('#newDisplayName');
        console.log('displayName', displayName.value);

        const phone = document.querySelector('#tel');
        console.log('phone', phone.value);
    }
}

