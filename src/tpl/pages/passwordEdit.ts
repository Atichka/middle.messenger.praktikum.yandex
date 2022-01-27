import {renderTemplate} from '../index'

const passwordEditLink = document.querySelector('.passwordEditLink') as HTMLElement;

passwordEditLink.addEventListener('click', () => {
    renderTemplate('passwordEdit')
});
