import {UsersDa} from '../../users/dataAccess/users.da';
import {LoginAuth, RegisterAuth} from '../models/auth.model';
import {User} from '../../users/models/user.model';
import { v4 as uuid } from 'uuid';
import {ConfigFactory} from '../../factories/configFactory';
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

export class AuthService {

    constructor(private userDA: UsersDa) {
    }

    async loginUser(login: LoginAuth): Promise<User>{
        const user = await this.userDA.getUserByEmail(login.email);
        if (user) {
            const isPasswordMatching = await bcrypt.compare(login.password, user.password);
            if (isPasswordMatching) {
                return user;
            } else {
                throw Error("Wrong password!");
            }
        } else {
            throw Error("Wrong email!");
        }
    }

    async registerUser(register: RegisterAuth): Promise<User>{
        const user = await this.userDA.getUserByEmail(register.email);
        if (user){
            throw Error("You cannot use this email!");
        }
        const newUser: User = {
            userId: uuid().toString(),
            email: register.email,
            password: await bcrypt.hash(register.password, 10),
            nickname: register.nickname

        }
        register.password = await bcrypt.hash(register.password, 10);

        const result = this.userDA.createUser(newUser);
        if (result){
            return result;
        } else {
            throw Error("Cannot register user. Please try again!");
        }
    }

    createToken(user: User){
        return jwt.sign(user, ConfigFactory.getConfig().jwtSecret, {expiresIn: 10*60});
    }

}