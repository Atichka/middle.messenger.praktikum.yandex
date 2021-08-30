import loginTemplate from './pages/login.pug';
import signinTemplate from './pages/signin.pug';
import chatsTemplate from './pages/chatPage.pug';
import profileTemplate from './pages/profile.pug';
import passwordEditTemplate from './pages/passwordEdit.pug';

const TEMPLATES = {
    login: loginTemplate,
    signin: signinTemplate,
    chats: chatsTemplate,
    profile: profileTemplate,
    passwordEdit: passwordEditTemplate
};

export function renderTemplate(name: any, locals: object = {}, parent: HTMLElement = document.body) {
    const template = TEMPLATES[name];
    parent.innerHTML = template(locals);
}
