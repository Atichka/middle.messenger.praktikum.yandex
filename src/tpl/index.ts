import loginTemplate from './pages/login.pug';
import signinTemplate from './pages/signin.pug';
import chatsTemplate from './pages/chatPage.pug';
import profileTemplate from './pages/profile.pug';
import passwordEditTemplate from './pages/passwordEdit.pug';
import error404Template from './pages/error404.pug';
import error500Template from './pages/error500.pug';

const TEMPLATES = {
    login: loginTemplate,
    signin: signinTemplate,
    chats: chatsTemplate,
    profile: profileTemplate,
    passwordEdit: passwordEditTemplate,
    error404: error404Template,
    error500: error500Template
};

export function renderTemplate(name: any, locals: object = {}, parent: HTMLElement = document.body) {
    const template = TEMPLATES[name];
    parent.innerHTML = template(locals);
}
