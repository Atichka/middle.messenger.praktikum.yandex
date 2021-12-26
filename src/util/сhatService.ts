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
    public openChat() {
        this.socket = new WebSocket(this.url);
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener('open', () => {
            console.log('Чат открыт');

            this.socket.send(JSON.stringify({
                content: "0",
                type: "get old"
            }));
        });

    }

    sendMessage(message) {
        this.socket.send(JSON.stringify({
            type: 'message',
            content: message
        }));
    }

    private onMessage(message) {
        // нужно обрабатывать разные типы сообщений
        store.set(store.getState(), `messages`, [message])
        // this.emit('message', message); // оповещаем о том, что пришло сообщение
        console.log('message', message);
    }

    private openSocket() {
        this.socket = new WebSocket(this.url);

        this.socket.addEventListener('message', this.onMessage.bind(this));
    }
}
