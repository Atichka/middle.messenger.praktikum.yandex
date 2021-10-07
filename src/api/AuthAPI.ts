import { BaseAPI } from './base-api';

interface SignupData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

interface LoginData {
    email: string,
    password: string
}

type UserData = Omit<SignupData, 'password'> & { avatar: string; display_name: string; };

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: SignupData): Promise<{ id: number }> {
        return this.http.post('/signup', data)
    }

    login(data: LoginData): Promise<void> {
        return this.http.post('/login', data)
    }

    logout(): Promise<void> {
        return this.http.post('/logout')
    }
    read(): Promise<UserData> {
        return this.http.get('/user')
    }

    create: undefined;
    update: undefined;
    delete: undefined;
}
