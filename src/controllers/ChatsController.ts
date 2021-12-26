import {ChatsAPI, ChatsData, TokenData} from "../api/ChatsAPI";
import store from "../util/store";
import {ChatService} from "../util/сhatService";

class ChatsController {
    private _api: ChatsAPI;

    constructor() {
        this._api = new ChatsAPI()
    }

    async chats(data: ChatsData) {
        try {
            await this._api.createChats(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getToken(data: TokenData) {
        try {
            const token = await this._api.getToken(data);
            return token;
        } catch (e) {
            console.log(e);
        }
    }

    async addUserInChat(data: ChatsData) {
        try {
            await this._api.put(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUserInChat(data: ChatsData) {
        try {
            await this._api.deleteUser(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getDataChats() {
        try {
            const ChatsData = await this._fetchChats();
            store.set(store.getState(), 'chats', ChatsData);
            const state = store.getState();
            for(let i = 0; i<state.chats.length; i++) {
                await this.getToken(`chats.${i}.id`).then(function (token) {
                    store.set(store.getState(), `chats.${i}.token`, token.token)
                })
                const chat = new ChatService("wss://ya-praktikum.tech/ws/chats/" +
                    state.user.id +
                    state.chats[i].id + "/" +
                    state.chats[i].token, state.chats[i].id, state.chats[i].token);
                chat.on('message', () => this.eventBus().emit('flow:component-did-update'));
            }
            return ChatsData;
        } catch (e) {
            console.log(e);
        }
    }

    async sendMessage(message) {
        try {
            const ChatsData = await this._fetchChats();
            const state = store.getState();
            if(state.currentChat) {
                const chat = new ChatService("wss://ya-praktikum.tech/ws/chats/" +
                    state.user.id +
                    state.currentChat.id + "/" +
                    state.currentChat.token, state.currentChat.id, state.currentChat.token);
                chat.sendMessage(message, state.currentChat.id);
                return ChatsData;
            } else {
                alert('Выберите чат')
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getDataChat(id) {
        try {
            const ChatsData = await this._fetchChats();
            store.set(store.getState(),'chats/' + id + '/common', ChatsData)
            return ChatsData;
        } catch (e) {
            console.log(e);
        }
    }

    async _fetchChats(): Promise<ChatsData> {
        const chats = await this._api.read();
        console.log('chats', chats);

        return chats;
    }
}

export default new ChatsController();
