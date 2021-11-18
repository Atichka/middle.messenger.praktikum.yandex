import {ChatsAPI, ChatsData} from "../api/ChatsAPI";

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
}

export default new ChatsController();
