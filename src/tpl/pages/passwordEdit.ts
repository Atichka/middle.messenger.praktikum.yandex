import {renderTemplate} from '../index'

const passwordEditLink = document.querySelector('.passwordEditLink');

// @ts-ignore
passwordEditLink.addEventListener('click', () => {
    renderTemplate('passwordEdit')
});
