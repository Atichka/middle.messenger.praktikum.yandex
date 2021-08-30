import {renderTemplate} from '../index'

const passwordEditLink = document.querySelector('.passwordEditLink');

passwordEditLink.addEventListener('click', () => {
    renderTemplate('passwordEdit')
});
