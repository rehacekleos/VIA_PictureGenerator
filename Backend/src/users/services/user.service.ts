import {UsersDa} from '../dataAccess/users.da';
import {UpdateUser, User} from '../models/user.model';
import {RegisterAuth} from '../../auth/models/auth.model';
import { v4 as uuid } from 'uuid';
import e from 'express';
const bcrypt = require('bcryptjs');
export class UserService {

    constructor(private userDA: UsersDa) {
    }

    async updateUser(userId: string, updatedUser: UpdateUser) {
        const user = await this.userDA.getUserById(userId);
        user.nickname = updatedUser.nickname;
        if (updatedUser.password !== ''){
            user.password = await bcrypt.hash(updatedUser.password, 10);
        }
        await this.userDA.updateUser(userId, user);
        return user;
    }

    async createUser(register: RegisterAuth) {
        const newUser: User = {
            userId: uuid().toString(),
            email: register.email,
            password: await bcrypt.hash(register.password, 10),
            nickname: register.nickname

        }
        register.password = await bcrypt.hash(register.password, 10);

        const result = await this.userDA.createUser(newUser);
        return result
    }

    async getUserById(userId: string){
        return await this.userDA.getUserById(userId);
    }
    async getUserByEmail(email: string) {
        return await this.userDA.getUserByEmail(email);
    }
}