import {Block, TProps} from "../../util/block";
import template from "./profile.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Router} from "../../util/router";
import {Link} from "../../components/Link/link";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import {Image} from "../../components/Image/image";
import store from "../../util/store";

export class ProfilePage extends Block<TProps> {
    constructor() {
        super('div');
        // @ts-ignore
        UserController.getDataUser().then(user => this.setProps({ user: user }));
    }

    public render(): DocumentFragment {
        const state = store.getState();
        const imageAvatar = new Image({
            classNames: ["profile__button-pic"],
            src: state.user ? state.user.avatar : '',
            id: "userAvatar",
        });
        const buttonProfile = new Button( {
            text: "←",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/messenger');
                }
            },
            classNames: ["profile__button-back"]
        });
        const linkProfileEdit = new Link( {
            text: 'Изменить данные',
            href: '/settings',
            classNames: ["text__blue", "profile__text"],
        });
        const linkPasswordEdit = new Link( {
            text: 'Изменить пароль',
            href: '/password-edit',
            classNames: ["text__blue", "profile__text"],
        });
        const linkExit = new Link( {
            text: 'Выйти',
            events: {
                click: () => this.exit(),
            },
            classNames: ["text__red", "profile__text"],
        });
        return compile(template,{
            buttonProfile: buttonProfile,
            linkProfileEdit: linkProfileEdit,
            linkPasswordEdit: linkPasswordEdit,
            linkExit: linkExit,
            email: state.user ? state.user.email : '',
            login: state.user ? state.user.login : '',
            firstName: state.user ? state.user.first_name : '',
            secondName: state.user ? state.user.second_name : '',
            displayName: state.user ? state.user.display_name : '',
            phone: state.user ? state.user.phone : '',
            imageAvatar: imageAvatar,
        });
    }

    async getDataUser() {
        await UserController.getDataUser();
    }

    async exit() {
        await AuthController.logout();
        const router = new Router();
        router.go('/login');
    }
}

