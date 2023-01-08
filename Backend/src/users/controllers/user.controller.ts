import {BaseController} from '../../controllers/base.controller';
import express, {RequestHandler} from 'express';
import {AuthMiddleware} from '../../middlewares/authMiddleware';
import {HttpException} from '../../exceptions/HttpException';
import {UserService} from '../services/user.service';
import {UpdateUser, User} from '../models/user.model';
import {UsersDa} from '../dataAccess/users.da';

export class UserController implements BaseController{
    path = '/user';
    router =  express.Router();

    constructor(private userService: UserService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.put('/', [AuthMiddleware], this.updateUser);
    }

    updateUser: RequestHandler = async (req, res, next: express.NextFunction) => {
        const updatedUser: UpdateUser = req.body;
        const user: User = req['user'];
        try{
            const updated = await this.userService.updateUser(user.userId, updatedUser);
            res.status(200).send(updated);
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

}