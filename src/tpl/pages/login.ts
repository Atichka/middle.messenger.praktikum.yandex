import {renderTemplate} from '../index'

const loginLink = document.querySelector('.login');

loginLink.addEventListener('click', () => {
    renderTemplate('login')
});
