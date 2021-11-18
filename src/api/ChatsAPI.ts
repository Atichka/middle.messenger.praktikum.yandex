import BaseAPI from './base-api';
import {SignupData} from "./AuthAPI";

export interface ChatsData {
    title: string
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/');
    }

    createChats(data: SignupData): Promise<{ id: number }> {
        return this.http.post('chats', data)
    }

    create: undefined;
    update: undefined;
    delete: undefined;
}
