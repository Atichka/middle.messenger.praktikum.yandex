import {Block, TProps} from "@/util/block";
import template from "./profileEdit.pug";
import {Button} from "@/components/Button/button";
import {compile} from "@/util/compile";
import {Input} from "@/components/Input/input";
import {Image} from "@/components/Image/image"
import {FormProfileEdit} from "@/components/FormProfileEdit/formProfileEdit";
import {FormAvatar} from "@/components/FormAvatar/formAvatar";
import {Router} from "@/util/router";
import UserController from "@/controllers/UserController";
import store from "@/util/store";
import UsersController from "@/controllers/UsersController";

export class ProfileEditPage extends Block<TProps> {
    constructor() {
        super('div');
        // @ts-ignore
        UserController.getDataUser().then(user => this.setProps({ user: user }));
        // @ts-ignore
        store.on('updated', () => this.eventBus().emit('flow:component-did-update'));
    }

    public render(): DocumentFragment {
        const state = store.getState();
        const imageAvatar = new Image({
            classNames: ["profile__button-pic"],
            src: state.user ? state.user.avatar : '',
            id: "userAvatar",
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
            })
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
                text: "??????????????????",
                events: {
                    click: (e: any) => this.sendData(e),
                },
                classNames: ["profile__button"],
            }),
            buttonChange: new Button( {
                text: "????????????????",
                events: {
                    click: (e: any) => this.sendData(e),
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
                placeholder: "????????",
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
                placeholder: "????????????",
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
                placeholder: "????????",
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
            text: "???",
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

    getImgData() {
        const chooseFile = document.getElementById("choose-file");
        const imgPreview = document.querySelector(".img-preview");
        // @ts-ignore
        const files = chooseFile.files[0];
        if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
                // @ts-ignore
                imgPreview.style.display = "block";
                // @ts-ignore
                imgPreview.innerHTML = '<img id="userAvatar" class="profile__button-pic" src="' + this.result + '" />';
            });
        }
    }

    async getDataUser() {
        await UserController.getDataUser();
    }

    sendData(e: any) {
        e.preventDefault();
        const formAvatar: any = document.forms[0];
        const form: any = document.forms[1];
        const formData: any = new FormData(form);
        let obj: Record<string, unknown> = {};
        for (let [name, value] of formData) {
            obj[name] = value;
        }
        // @ts-ignore
        UsersController.profileEdit(obj)
        // @ts-ignore
        if(document.getElementById("choose-file").value) {
            let formSendAvatar: any = new FormData(formAvatar);
            UsersController.avatarEdit(formSendAvatar)
        }
    }
}


