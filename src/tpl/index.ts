import loginTemplate from './pages/login.pug';
import signinTemplate from './pages/signin.pug';
import chatsTemplate from './pages/chatPage.pug';

const TEMPLATES = {
    login: loginTemplate,
    signin: signinTemplate,
    chats: chatsTemplate
};

export function renderTemplate(name: any, locals: object = {}, parent: HTMLElement = document.body) {
    const template = TEMPLATES[name];
    parent.innerHTML = template(locals);
}
