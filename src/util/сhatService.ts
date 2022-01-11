import {EventBus} from './event-bus';
import store from "./store";

export class ChatService extends EventBus {
    public id: number;
    constructor(url: string, id: any, token: any) {
        super();
        // @ts-ignore
        this.url = url;
        this.id = id;
        // @ts-ignore
        this.token = token;

        this.openSocket();
    }

    public getOldMessages() {
        // @ts-ignore
        this.socket.send(JSON.stringify({
            content: "0",
            type: "get old"
        }));
    }

    sendMessage(message: any) {
        // @ts-ignore
        this.socket.send(JSON.stringify({
            type: 'message',
            content: message
        }));
    }

    private onMessage(message: any) {
        const data = JSON.parse(message.data);
        const messagesState = store.getState().messages || {};
        const messages = messagesState[this.id] || [];

        if (data.type === 'message') {
            store.set(store.getState(), `messages.${this.id}`, [...messages, data]);
        }
        if (Array.isArray(data) && data.length > 0) {
            store.set(store.getState(), `messages.${this.id}`, [...messages, ...data]);
        }
    }

    private openSocket() {
        // @ts-ignore
        this.socket = new WebSocket(this.url);
        // @ts-ignore
        this.socket.addEventListener('message', this.onMessage.bind(this));
    }
}
