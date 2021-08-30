import {renderTemplate} from '../index'

const loginLink = document.querySelector('.loginLink');

loginLink.addEventListener('click', () => {
    renderTemplate('login')
});
