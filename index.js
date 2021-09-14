import compileTemplate from './src/tpl/index.pug';
import { Button } from "./src/components/Button/button";

const app = document.getElementById('app');
app.innerHTML = compileTemplate({  });

const button = new Button({
    text: 'Click me',
});

app.appendChild(button.getContent());

button.addEventListener('click', () => {
    alert("*")
});

// Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//     button.setProps({
//         text: 'Click me, please',
//     });
// }, 1000);
