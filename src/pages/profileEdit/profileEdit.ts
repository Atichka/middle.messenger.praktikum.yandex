import {Block} from "../../util/block";
import template from "./profileEdit.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Input} from "../../components/Input/input";
import {Image} from "../../components/Image/image"
import {FormProfileEdit} from "../../components/FormProfileEdit/formProfileEdit";
import {FormAvatar} from "../../components/FormAvatar/formAvatar";
import {Router} from "../../util/router";
import UserController from "../../controllers/UserController";
import store from "../../util/store";
import UsersController from "../../controllers/UsersController";

export class ProfileEditPage extends Block {
    constructor() {
        super('div');
        UserController.getDataUser().then(user => this.setProps({ user: user }));
        store.on('updated', () => this.eventBus().emit('flow:component-did-update'));
    }

    public render(): DocumentFragment {
        const state = store.getState();
        const imageAvatar = new Image({
            classNames: ["profile__button-pic"],
            src: state.user ? state.user.avatar : '',
        });

        const formAvatar = new FormAvatar( {
            classNames: ["form"],
            id: "avatar",
            name: "avatar",
            enctype: "multipart/form-data",
            inputChangeAvatar: new Input( {
                classNames: ["profile__button-pic"],
                events: {
                    change: () => this.getImgData(),
                },
                id: "choose-file",
                type: "file",
                name: "avatar",
                accept: "image/*",
            }),
        });

        const formProfileEdit = new FormProfileEdit( {
            classNames: ["form"],
            id: "formData",
            name: "formData",
            inputChangeAvatar: new Input( {
                classNames: ["profile__button-pic"],
                events: {
                    change: () => this.getImgData(),
                },
                id: "choose-file",
                type: "file",
                name: "choose-file",
                accept: "image/*",
            }),
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
                name: "phone",
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
            formAvatar: formAvatar,
            formProfileEdit: formProfileEdit,
            imageAvatar: imageAvatar,
        });
    }

    async getDataUser() {
        await UserController.getDataUser();
    }

    sendData(e) {
        e.preventDefault();
        const formAvatar: any = document.forms[0];
        const formSendAvatar: any = new FormData(formAvatar);
        const form: any = document.forms[1];
        const formData: any = new FormData(form);
        let obj: Record<string, unknown> = {};
        for (let [name, value] of formData) {
            obj[name] = value;
        }
        console.log(obj);
        console.log('formAvatar', formSendAvatar);
        UsersController.profileEdit(obj)
        UsersController.avatarEdit(formSendAvatar)
    }

    getAvatar(user) {
        const imgPreview = document.getElementById("img-preview");

        if(user) {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img id="userAvatar" crossorigin="use-credentials" ' +
                'class="profile__button-pic" src="' + 'https://ya-praktikum.tech/api/v2/resources' + user.avatar + '" />';
            console.log('imgPreview', imgPreview);
        }
    }
}

