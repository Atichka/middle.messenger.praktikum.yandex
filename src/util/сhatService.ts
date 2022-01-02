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
    public getOldMessages() {
        this.socket.send(JSON.stringify({
                content: "0",
                type: "get old"
        }));
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify({
            type: 'message',
            content: message
        }));
    }

    private onMessage(message) {
        // this.emit('message', message); // оповещаем о том, что пришло сообщение
        const data = JSON.parse(message.data);
        console.log('data', data);
            const messagesState = store.getState().messages || {};
            const messages = messagesState[data.chat_id] || [];

            if(data.type==='message') {
                store.set(store.getState(), `messages.${data.chat_id}`, [...messages, data]);
            }
            if(Array.isArray(data) && data.length>0) {
                const firstMessage = data[0];
                store.set(store.getState(), `messages.${firstMessage.chat_id}`, [...messages, ...data]);
            }

        console.log('store.getState()', store.getState());
    }

    private openSocket() {
        this.socket = new WebSocket(this.url);

        this.socket.addEventListener('message', this.onMessage.bind(this));
    }
}
