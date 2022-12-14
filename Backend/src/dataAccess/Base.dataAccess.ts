import {Db, MongoClient} from 'mongodb';
import {ConfigFactory} from '../factories/configFactory';
import {MongoDB} from './DBConnection/MongoDB';

export class BaseDataAccess{
    private client: MongoClient;
    protected db: Db;

    constructor() {
        this.connect().then();
    }

    private async connect() {
        const dbConnection = MongoDB.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(ConfigFactory.getConfig().mongoDatabase);
    }
}