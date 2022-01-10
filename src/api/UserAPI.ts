import BaseAPI from './base-api';

export interface SignupData {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string
}

export type UserData = Omit<SignupData, 'password'> & { avatar: string; display_name: string; };

// @ts-ignore
export class UserAPI extends BaseAPI {
    constructor() {
        super('/auth/user');
    }

    read(): Promise<UserData> {
        return this.http.get('/')
    }

    create: undefined;
    update: undefined;
    delete: undefined;
}
