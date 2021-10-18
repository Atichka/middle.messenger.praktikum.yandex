import {Block} from "../../util/block";
import template from "./profile.pug";
import {Button} from "../../components/Button/button";
import {compile} from "../../util/compile";
import {Router} from "../../util/router";
import {Link} from "../../components/Link/link";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";

export class ProfilePage extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
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
        const res = this.getDataUser();
        return compile(template,{
            buttonProfile: buttonProfile,
            linkProfileEdit: linkProfileEdit,
            linkPasswordEdit: linkPasswordEdit,
            linkExit: linkExit,
            res: res,
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

