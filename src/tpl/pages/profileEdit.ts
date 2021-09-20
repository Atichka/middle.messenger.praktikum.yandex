import {renderTemplate} from '../index'

const profileEditLink = document.querySelector('.profileEditLink');

profileEditLink.addEventListener('click', () => {
    renderTemplate('profileEdit')
});
