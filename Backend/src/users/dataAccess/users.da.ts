import {BaseDataAccess} from '../../dataAccess/Base.dataAccess';
import {DataAccessInterface} from '../../dataAccess/dataAccess.interface';
import {User} from '../models/user.model';
import {ConfigFactory} from '../../factories/configFactory';

export class UsersDa extends BaseDataAccess implements DataAccessInterface{
    collection: string;

    private static instance: UsersDa;
    public static getInstance(){
        if (!UsersDa.instance){
            UsersDa.instance = new UsersDa()
        }
        return UsersDa.instance;
    }

    constructor() {
        super();
        this.collection = ConfigFactory.getConfig().usersCollection;
    }

    async getUserByEmail(email: string): Promise<User>{
        const user = await this.db.collection(this.collection).findOne({email: email}) as any;
        return user as User
    }

    async getUserById(userId: string): Promise<User>{
        return await this.db.collection(this.collection).findOne({userId: userId}) as any as User;
    }

    async createUser(user: User): Promise<User>{
        const result = await this.db.collection(this.collection).insertOne(user);
        if (result.insertedId){
            return user;
        }
        return null;
    }

    async updateUser(userId: string, user: User){
        try {
            return await this.db.collection(this.collection).updateOne({userId: userId}, {$set: user});
        } catch (e) {
            console.log(e)
        }
    }

}