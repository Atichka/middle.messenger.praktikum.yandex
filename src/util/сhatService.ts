import {EventBus} from './event-bus';
import store from "./store";

export class ChatService extends EventBus {
    constructor(url, id, token) {
        super();
        this.url = url;
        this.id = id;
        this.token = token;

        this.openSocket();
    }

    public sendMessage(message, chatId) {
        this.socket = new WebSocket(this.url, this.id, this.token);

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            this.socket.send(JSON.stringify({
                content: message,
                type: 'message',
            }));
        });
        if(!store.getState().messages) {
            store.set(store.getState(), `messages.${chatId}`, [message])
        } else {
            const messages = store.getState().messages[chatId] || [];
            store.set(store.getState(), `messages.${chatId}`, [message, ...messages])
        }


        console.log('store.getState()', store.getState());
    }

    private onMessage(message) {
        // нужно обрабатывать разные типы сообщений

        this.emit('message', message); // оповещаем о том, что пришло сообщение
    }

    private openSocket() {
        this.socket = new WebSocket(this.url, this.id, this.token);

        this.socket.addEventListener('message', this.onMessage.bind(this));
    }
}
