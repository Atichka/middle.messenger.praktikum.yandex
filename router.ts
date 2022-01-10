import { Router } from "./src/util/router";
import { LoginPage } from "./src/pages/login/login"
import { SigninPage } from "./src/pages/signin/signin"
import { ChatsPage } from "./src/pages/chats/chats"
import { ProfilePage } from "./src/pages/profile/profile"
import { ProfileEditPage } from "./src/pages/profileEdit/profileEdit"
import { PasswordEditPage } from "./src/pages/passwordEdit/passwordEdit"
import { Error404Page } from "./src/pages/error404/error404"
import { Error500Page } from "./src/pages/error500/error500"
import AuthController from "./src/controllers/AuthController";

const router = new Router()
    .use('/login', LoginPage as any) // TypeScript не понимает, что typeof LoginPage наследует typeof Block
    .use('/sign-up', SigninPage as any)
    .use('/messenger', ChatsPage as any) // регистрируем роуты, но роутер пока не запускаем
    .use("/profile", ProfilePage as any)
    .use("/settings", ProfileEditPage as any)
    .use("/password-edit", PasswordEditPage as any)
    .use("/404", Error404Page as any)
    .use("/500", Error500Page as any)

async function start(){
    try {
        await AuthController.fetchUser(); // запрашиваем пользователя и сетим в стейт, если успешно
        router.start(); // пользователь окажется на странице, на которую хотел
    } catch (e) {
        router.go('/login');
        router.start(); // запрос не прошел, значит пользователь не авторизован, перенаправляем на /login и запускаем роутер
    }
}

start().then();
