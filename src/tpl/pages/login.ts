import {renderTemplate} from '../index'

const loginLink = document.querySelector('.login');

loginLink.addEventListener('click', () => {
    console.log("!")
    renderTemplate('login')
});
