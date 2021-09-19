import {renderTemplate} from '../index'

const error500Link = document.querySelector('.error500Link');

error500Link.addEventListener('click', () => {
    renderTemplate('error500')
});
