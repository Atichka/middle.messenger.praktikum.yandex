import loginTemplate from './pages/login.pug';
import signinTemplate from './pages/signin.pug';

const TEMPLATES = {
    login: loginTemplate,
    signin: signinTemplate
};

export function renderTemplate(name: any, locals: object = {}, parent: HTMLElement = document.body) {
    const template = TEMPLATES[name];
    parent.innerHTML = template(locals);
}
