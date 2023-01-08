import express from 'express';
import cors from 'cors'
import {BaseController} from "../controllers/base.controller";
import {errorHandlerMiddleware} from "../middlewares/errorHandler.middleware";
import {logger} from '../logger/logger';

import {serverMiddleware} from "../middlewares/server.middleware";
import process from "process";

const bodyParser = require('body-parser');
const helmet = require("helmet");
const enforce = require('express-sslify');

export class Server {
    public app: express.Application
    public port: number;

    constructor(port, controllers: BaseController[]) {
        this.app = express();
        this.app.use(helmet());
        this.app.use(serverMiddleware);

        if (process.env.FORCE_HTTPS && process.env.FORCE_HTTPS === "true") {
            this.app.use(enforce.HTTPS({trustProtoHeader: true}));
        }

        this.port = port;

        this.app.use(bodyParser.json({limit: "100mb"}));
        this.app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

        this.app.use(express.json());
        this.app.use(cors());

        this.initControllers(controllers);

        this.app.use(express.static(process.cwd()+"/build/fe/"));

        this.app.use(errorHandlerMiddleware);
    }

    public listen() {
        return this.app.listen(this.port, () => {
            logger.info(`Picture Generator Server listening on the port ${this.port}`);
        });
    }

    private initControllers(controllers: BaseController[]) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }
}
