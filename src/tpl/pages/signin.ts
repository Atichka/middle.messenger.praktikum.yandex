import {renderTemplate} from '../index'

const signinLink = document.querySelector('.signinLink');

signinLink.addEventListener('click', () => {
    renderTemplate('signin')
});
