import {renderTemplate} from '../index'

const signinLink = document.querySelector('.signinLink');

// @ts-ignore
signinLink.addEventListener('click', () => {
    renderTemplate('signin')
});
