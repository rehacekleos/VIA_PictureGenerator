import {MongoClient} from "mongodb";
const cluster = require('cluster');
import {ConfigFactory} from "../../factories/configFactory";
import {logger} from "../../logger/logger";

export class MongoDB {
    private static instance: MongoDB
    private readonly mongoClient: Promise<MongoClient>
    public static isConnected = false;

    /***
     *
     * @param isMaster true if current thread is master from cluster
     */
    constructor(isMaster?: boolean) {
        logger.info('Creating Mongo client', ConfigFactory.getConfig().mongoDbUri);
        this.mongoClient = MongoClient.connect(encodeURI(ConfigFactory.getConfig().mongoDbUri)).then( async (res) => {
                logger.info('Mongo client connected!');
                MongoDB.isConnected = true;
                return res;
            }
        );
    }

    public static getInstance(){
        if (!MongoDB.instance){
            MongoDB.instance = new MongoDB(cluster.isMaster)
        }
        return MongoDB.instance;
    }

    public getMongoClient(){
        return this.mongoClient;
    }
}
