import {ChatsAPI, ChatsData, TokenData} from "../api/ChatsAPI";
import store from "../util/store";

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
            await this._api.getToken(data);
            store.set('token', data)
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
            store.set('chats', ChatsData)
            return ChatsData;
        } catch (e) {
            console.log(e);
        }
    }

    async getDataChat(id) {
        try {
            const ChatsData = await this._fetchChats();
            store.set('chats/' + id + '/common', ChatsData)
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
