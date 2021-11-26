import BaseAPI from './base-api';
import {SignupData, UserData} from "./AuthAPI";

export interface ChatsData {
    title: string
}

export type UserData = Omit<SignupData, 'password'> & { avatar: string; display_name: string; };

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/');
    }

    createChats(data: SignupData): Promise<{ id: number }> {
        return this.http.post('chats', data)
    }

    read(): Promise<UserData> {
        return this.http.get('chats')
    }

    create: undefined;
    update: undefined;
    delete: undefined;
}
