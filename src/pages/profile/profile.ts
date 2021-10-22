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
        UserController.getDataUser().then(user => this.setProps({ user: user }));
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
        return compile(template,{
            buttonProfile: buttonProfile,
            linkProfileEdit: linkProfileEdit,
            linkPasswordEdit: linkPasswordEdit,
            linkExit: linkExit,
            email: this.props.user ? this.props.user.email : '',
            login: this.props.user ? this.props.user.login : '',
            firstName: this.props.user ? this.props.user.first_name : '',
            secondName: this.props.user ? this.props.user.second_name : '',
            displayName: this.props.user ? this.props.user.display_name : '',
            phone: this.props.user ? this.props.user.phone : '',
            avatar: this.props.user && this.props.user.avatar ? this.props.user.avatar : 'https://e7.pngegg.com/pngimages/867/136/png-clipart-computer-icons-graphy-encapsulated-postscript-360-degrees-angle-text.png',
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

