import {BaseController} from '../../controllers/base.controller';
import {AuthService} from '../../auth/services/auth.service';
import * as express from "express";
import {LoginAuth} from '../../auth/models/auth.model';
import {HttpException} from '../../exceptions/HttpException';
import {RequestHandler} from 'express';
import {ImageService} from '../services/image.service';
import {AuthMiddleware} from '../../middlewares/authMiddleware';
import {User} from '../../users/models/user.model';


export class ImageController implements BaseController{
    path: string = "/image";
    router = express.Router();

    constructor(private imageService: ImageService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', [AuthMiddleware], this.getMyImages);
        this.router.get('/all', this.getAllImages);
        this.router.post('/generate', [AuthMiddleware], this.generateImage);

    }

    getAllImages: RequestHandler = async (req, res, next: express.NextFunction) => {
        try{
            const images = await this.imageService.getAllImages();
            res.status(200).send(images);
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    getMyImages: RequestHandler = async (req, res, next: express.NextFunction) => {
        const user = req['user'] as User;
        try{
            const images = await this.imageService.getMyImages(user.userId);
            res.status(200).send(images);
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    generateImage: RequestHandler = async (req, res, next: express.NextFunction) => {
        const prompt: string = req.body.prompt;
        const user = req['user'];
        try{
            const url = await this.imageService.generateImage(prompt, user);
            res.status(200).send(url);
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }
}