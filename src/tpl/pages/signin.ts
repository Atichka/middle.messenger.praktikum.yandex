import {renderTemplate} from '../index'

const signinLink = document.querySelector('.signinLink') as HTMLElement;

signinLink.addEventListener('click', () => {
    renderTemplate('signin')
});
