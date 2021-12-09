import BaseAPI from './base-api';

export interface ChatsData {
    "users": [
        0
    ],
    "chatId": 0
}

export interface TokenData {
    token: String,
}

// export type UserData = Omit<SignupData, 'password'> & { avatar: string; display_name: string; };

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/');
    }

    getToken(data: TokenData): Promise<{ id: number }> {
        return this.http.post(`/chats/token/${data}`)
    }

    createChats(data: ChatsData): Promise<{ id: number }> {
        return this.http.post('chats', data)
    }

    async put(data: ChatsData): Promise<{ id: number }> {
        console.log('data', data);
        return this.http.put('chats/users', data)
    }

    deleteUser(data: ChatsData): Promise<{ id: number }> {
        console.log('data', data);
        return this.http.delete('chats/users', data)
    }

    read(): Promise<ChatsData> {
        return this.http.get('chats')
    }

    getChat(id): Promise<ChatsData> {
        return this.http.get('chats/' + id + '/common')
    }

    create: undefined;
    update: undefined;
    // delete: undefined;
}
