import {UsersDa} from '../../users/dataAccess/users.da';
import {LoginAuth, RegisterAuth} from '../models/auth.model';
import {User} from '../../users/models/user.model';

import {ConfigFactory} from '../../factories/configFactory';
import {UserService} from '../../users/services/user.service';
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

export class AuthService {

    constructor(private userService: UserService) {
    }

    async loginUser(login: LoginAuth): Promise<User>{
        const user = await this.userService.getUserByEmail(login.email);
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
        const user = await this.userService.getUserByEmail(register.email);
        if (user){
            throw Error("You cannot use this email!");
        }
        const result = await this.userService.createUser(register)
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