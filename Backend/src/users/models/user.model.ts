export class User{
    userId: string;
    email: string;
    nickname: string;
    password: string;
    picture?: any;
}

export class UpdateUser{
    nickname: string;
    password: string;
}