import {ChatsAPI, ChatsData, TokenData} from "../api/ChatsAPI";
import store from "../util/store";
import {ChatService} from "../util/сhatService";

class ChatsController {
    private _api: ChatsAPI;
    public services: any;

    constructor() {
        this._api = new ChatsAPI()
        this.services = {}
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
            for (let i = 0; i < state.chats.length; i++) {
                await this.getToken(state.chats[i].id).then(function (token) {
                    // @ts-ignore
                    store.set(store.getState(), `chats.${i}.token`, token.token)
                })
                const chat = new ChatService("wss://ya-praktikum.tech/ws/chats/" +
                    state.user.id + "/" +
                    state.chats[i].id + "/" +
                    state.chats[i].token, state.chats[i].id, state.chats[i].token);
                this.services[state.chats[i].id] = chat
            }
            return ChatsData;
        } catch (e) {
            console.log(e);
        }
    }

    openChat(chatId: number) {
        store.set(store.getState(), 'currentChatId', chatId)
        const currentChat = this.services[chatId];

        currentChat.getOldMessages();
    }

    sendMessage(chatId: string | number, message: any) {
        const service = this.services[chatId];

        service.sendMessage(message);
    }

    async getDataChat(id: string) {
        try {
            const ChatsData = await this._fetchChats();
            store.set(store.getState(), 'chats/' + id + '/common', ChatsData)
            return ChatsData;
        } catch (e) {
            console.log(e);
        }
    }

    async _fetchChats(): Promise<ChatsData> {
        const chats = await this._api.read();

        return chats;
    }
}

export default new ChatsController();
