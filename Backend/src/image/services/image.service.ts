import {DallEService} from '../../dataAccess/dallE/dallE.service';
import {ImageDa} from '../dataAccess/image.da';
import {GenerateImage, Image} from '../models/image.model';
import {User} from '../../users/models/user.model';
import { v4 as uuid } from 'uuid';
import {HttpException} from '../../exceptions/HttpException';
import {UsersDa} from '../../users/dataAccess/users.da';
import {UserService} from '../../users/services/user.service';

export class ImageService{

    constructor(private dallEService: DallEService,
                private userService: UserService,
                private imageDa: ImageDa) {
    }

    async generateImage(generate: GenerateImage, user: User){
        const count = await this.imageDa.getCount(user.userId);
        if (count >= 10){
            throw new HttpException(400, 'You reach a limit of 10 images');
        }

        try {
            const imageBuffer =  await this.dallEService.generateImage(generate.prompt);
            const image: Image = {
                imageId: uuid().toString(),
                userId: user.userId,
                image: imageBuffer,
                createdIn: new Date().toString(),
                name: generate.name,
                rating: []
            };
            await this.imageDa.saveImage(image);
            image.image = image.image.toString('base64');
            return image;
        } catch (e) {
            if (e.response) {
                console.log(e.response.status);
                console.log(e.response.data);
            } else {
                console.log(e.message);
            }
        }
    }

    async getAllImages(){
        try {
            const images = await this.imageDa.getAllImages();
            for (let image of images){
                const user = await this.userService.getUserById(image.userId);
                image.author = user.nickname;
            }
            return images
        } catch (e) {

        }
    }

    async getMyImages(userId: string) {
        try {
            const images = await this.imageDa.getMyImages(userId);
            return images;
        } catch (e) {

        }
    }

    async getImageById(imageId: string){
        return await this.imageDa.getImage(imageId);
    }

    async ratingImage(imageId: string, rating: string) {
        await this.imageDa.addRating(imageId, rating);
    }

    async getImageCount(userId: string) {
        return await this.imageDa.getCount(userId);
    }

    async deleteImage(imageId: string, user: User) {
        const image = await this.imageDa.getImage(imageId);
        if (image.userId !== user.userId){
            throw new Error('You can not delete this image');
        }
        await this.imageDa.deleteImage(imageId);
    }
}