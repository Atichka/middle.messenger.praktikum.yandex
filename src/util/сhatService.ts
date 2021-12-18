import { EventBus } from './event-bus';

export class ChatService extends EventBus {
    constructor(url, id, token) {
        super();
        this.url = url;
        this.id = id;
        this.token = token;

        this.openSocket();
    }

    public sendMessage(message) {}

    private onMessage(message) {
        // нужно обрабатывать разные типы сообщений

        this.emit('message', message); // оповещаем о том, что пришло сообщение
    }

    private openSocket() {
        this.socket = new WebSocket(this.url, this.id, this.token);

        this.socket.addEventListener('message', this.onMessage.bind(this));
    }
}
