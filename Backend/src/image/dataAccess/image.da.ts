import {BaseDataAccess} from '../../dataAccess/Base.dataAccess';
import {DataAccessInterface} from '../../dataAccess/dataAccess.interface';
import {Image} from '../models/image.model';
import {ConfigFactory} from '../../factories/configFactory';


export class ImageDa extends BaseDataAccess implements DataAccessInterface{
    collection: string;

    private static instance: ImageDa;
    public static getInstance(){
        if (!ImageDa.instance){
            ImageDa.instance = new ImageDa()
        }
        return ImageDa.instance;
    }

    constructor() {
        super();
        this.collection = ConfigFactory.getConfig().imagesCollection;
    }

    async saveImage(image: Image): Promise<Image>{
        const result = await this.db.collection(this.collection).insertOne(image);
        if (result.insertedId){
            return image;
        }
        return null;
    }

    async getAllImages(){
        const result = await this.db.collection(this.collection).find().toArray() as any[] as Image[];
        return result as Image[];
    }

    async getMyImages(userId: string){
        const query = {
            userId: userId
        }
        const result = await this.db.collection(this.collection).find(query).toArray() as any[] as Image[];
        return result;
    }

    async getImage(imageId: string) {
        const query = {
            imageId: imageId
        }
        const result = await this.db.collection(this.collection).findOne(query) as any as Image;
        return result;
    }

    async addRating(imageId: string, rating: string) {
        const query = {
            imageId: imageId
        }
        await this.db.collection(this.collection).updateOne(query, {$push: {rating: rating}})
    }

    async getCount(userId?: string) {
        const query = {
            userId: userId
        }
        const result = await this.db.collection(this.collection).countDocuments(query);
        return result
    }

    async deleteImage(imageId: string) {
        const query = {
            imageId: imageId
        }
        await this.db.collection(this.collection).deleteOne(query);
    }
}