import {renderTemplate} from '../index'

const error500Link = document.querySelector('.error500Link');

// @ts-ignore
error500Link.addEventListener('click', () => {
    renderTemplate('error500')
});
