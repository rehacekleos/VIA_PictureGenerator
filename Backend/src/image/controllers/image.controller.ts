import {BaseController} from '../../controllers/base.controller';
import {AuthService} from '../../auth/services/auth.service';
import * as express from "express";
import {LoginAuth} from '../../auth/models/auth.model';
import {HttpException} from '../../exceptions/HttpException';
import {RequestHandler} from 'express';
import {ImageService} from '../services/image.service';
import {AuthMiddleware} from '../../middlewares/authMiddleware';
import {User} from '../../users/models/user.model';
import {GenerateImage} from '../models/image.model';


export class ImageController implements BaseController{
    path: string = "/image";
    router = express.Router();

    constructor(private imageService: ImageService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', [AuthMiddleware], this.getMyImages);
        this.router.get('/all', this.getAllImages);
        this.router.get('/count',[AuthMiddleware], this.getImageCount);
        this.router.get('/randomName',[AuthMiddleware], this.getRandomName);
        this.router.post('/generate', [AuthMiddleware], this.generateImage);
        this.router.post('/rating/:imageId', [AuthMiddleware], this.ratingImage);
        this.router.delete('/:imageId', [AuthMiddleware], this.deleteImage);

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

    getImageCount: RequestHandler = async (req, res, next: express.NextFunction) => {
        const user = req['user'] as User;
        try{
            const count = await this.imageService.getImageCount(user.userId);
            res.status(200).send({count: count});
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    getRandomName: RequestHandler = async (req, res, next: express.NextFunction) => {
        const user = req['user'] as User;
        try{
            const name = await this.imageService.getRandomName();
            res.status(200).send({name: name});
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    generateImage: RequestHandler = async (req, res, next: express.NextFunction) => {
        const generateImage: GenerateImage = req.body;
        const user = req['user'];
        try{
            const image = await this.imageService.generateImage(generateImage, user);
            res.status(200).send(image);
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    ratingImage: RequestHandler = async (req, res, next: express.NextFunction) => {
        const rating: string = req.body.rating;
        const imageId: string = req.params?.imageId;
        const user = req['user'];
        try{
            await this.imageService.ratingImage(imageId, rating);
            res.status(200).send();
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }

    deleteImage: RequestHandler = async (req, res, next: express.NextFunction) => {
        const imageId: string = req.params?.imageId;
        const user = req['user'];
        try{
            await this.imageService.deleteImage(imageId, user);
            res.status(200).send();
        } catch (e) {
            next(new HttpException(400, e.message));
        }
    }
}