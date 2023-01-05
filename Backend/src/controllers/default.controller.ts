import {BaseController} from "./base.controller";
import * as express from "express";
import {RequestHandler} from "express";
import {ConfigFactory} from "../factories/configFactory";
import {MongoDB} from "../dataAccess/DBConnection/MongoDB";

export class DefaultController implements BaseController {

    public router = express.Router();
    path = '/';

    constructor() {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', this.indexHandler);
        this.router.get('/health-check', this.getHealthCheck);
    }

    indexHandler: RequestHandler = async (req, res) => {
        res.status(200).send('Picture Generator Server is running on version: '+ ConfigFactory.getConfig().version);
    };

    getHealthCheck: RequestHandler = async (req, res) => {
        if (MongoDB.isConnected === false) {
            res.status(500).send('Database is not connected');
            return;
        }
        res.status(200).send('Audit server is running on version: '+ ConfigFactory.getConfig().version);
    };
}
