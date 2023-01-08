import {BaseController} from '../../controllers/base.controller';
import * as express from "express";
import {RequestHandler} from 'express';
import {LoginAuth, RegisterAuth} from '../models/auth.model';
import {HttpException} from '../../exceptions/HttpException';
import {AuthService} from '../services/auth.service';


export class AuthController implements BaseController{
    path: string = "/auth";
    router = express.Router();

    constructor(private authService: AuthService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }

    login: RequestHandler = async (req, res, next: express.NextFunction) => {
        const auth: LoginAuth = req.body;
        try{
            const user = await this.authService.loginUser(auth);
            const token = AuthService.createToken(user);
            res.status(200).send({token});
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    register: RequestHandler = async (req, res, next: express.NextFunction) => {
        const register: RegisterAuth = req.body;
        try{
            const user = await this.authService.registerUser(register);
            const token = AuthService.createToken(user);
            res.status(200).send({token});
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

}