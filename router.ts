import { Router } from "./src/util/Router";
import { LoginPage } from "./src/pages/login/login"
import { SigninPage } from "./src/pages/signin/signin"
import { ChatsPage } from "./src/pages/chats/chats"
import { ProfilePage } from "./src/pages/profile/profile"
import { ProfileEditPage } from "./src/pages/profileEdit/profileEdit"
import { PasswordEditPage } from "./src/pages/passwordEdit/passwordEdit"
import { Error404Page } from "./src/pages/error404/error404"
import { Error500Page } from "./src/pages/error500/error500"

const router = new Router(".app");

router
    .use("/login", LoginPage)
    .use("/signin", SigninPage)
    .use("/chats", ChatsPage)
    .use("/profile", ProfilePage)
    .use("/profile-edit", ProfileEditPage)
    .use("/password-edit", PasswordEditPage)
    .use("/404", Error404Page)
    .use("/500", Error500Page)
    .start();
