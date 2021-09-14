// import compileTemplate from './src/tpl/index.pug';
// import { Button } from "./src/components/Button/button";
import {HomePage} from "./src/pages/home";
import {Block} from "./src/util/block";

export function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if(!root) {
        throw new Error("Root not found");
    }

    root.appendChild(block.getContent());

    return root;
}

render('#app', new HomePage())
// const app = document.getElementById('app');
// app.innerHTML = compileTemplate({  });
//
// const HomePage = new HomePage();
//
// app.appendChild(button.getContent());

// if (button) {
//     button.addEventListener('click', () => {
//         alert("*")
//     });
// }

// Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//     button.setProps({
//         text: 'Click me, please',
//     });
// }, 1000);
