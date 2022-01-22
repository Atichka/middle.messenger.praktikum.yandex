import {renderTemplate} from '../index'

const error404Link = document.querySelector('.error404Link');

// @ts-ignore
error404Link.addEventListener('click', () => {
    renderTemplate('error404')
});
