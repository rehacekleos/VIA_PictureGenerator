import {DallEService} from '../../dataAccess/dallE/dallE.service';
import {ImageDa} from '../dataAccess/image.da';
import {Image} from '../models/image.model';
import {User} from '../../users/models/user.model';

export class ImageService{

    constructor(private dallEService: DallEService,
                private imageDa: ImageDa) {
    }

    async generateImage(prompt: string, user: User){
        try {
            const imageBuffer =  await this.dallEService.generateImage(prompt);
            const image: Image = {
                userId: user.userId,
                image: imageBuffer,
                createdIn: new Date().toString(),
                author: user.nickname,
                name: prompt
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
            return await this.imageDa.getAllImages();
        } catch (e) {

        }
    }

    async getMyImages(userId: string) {
        try {
            return await this.imageDa.getMyImages(userId);
        } catch (e) {

        }
    }
}