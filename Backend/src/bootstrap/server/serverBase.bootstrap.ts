// Base bootstrap class for server init.
// This class contains all shared operations with basic implementation for both subclasses.
// Do not use this class directly. Use it as parent class.
// Cloud version is used as base version, so little changes in cloud subclass.
import {IServerInstances} from "../../interfaces/IServerInstances";
import {Server} from "../../server/server";
import express from 'express';
import {DefaultController} from "../../controllers/default.controller";
import {AuthController} from '../../auth/controllers/auth.controller';
import {UsersDa} from '../../users/dataAccess/users.da';
import {AuthService} from '../../auth/services/auth.service';
import {DallEService} from '../../dataAccess/dallE/dallE.service';
import {ImageService} from '../../image/services/image.service';
import {ImageController} from '../../image/controllers/image.controller';
import {ImageDa} from '../../image/dataAccess/image.da';
import {UserService} from '../../users/services/user.service';
import {UserController} from '../../users/controllers/user.controller';
import {WordGeneratorService} from '../../dataAccess/wordGenerator/wordGenerator.service';

export class ServerBaseBootstrap {

    protected workers: number;
    protected server: Server;

    constructor() {
        this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1;
    }

    /**
     * Function that serves as a template for server init.
     * @protected
     *
     * @returns {Promise<IServerInstances>} Return value is promise due to async character of the method.
     */
    protected async start():Promise<IServerInstances>{return;}

    /**
     * Base method for server init derivative from old cloud settings.
     * @protected
     *
     * @returns {express.Application}
     */
    protected initServer(): express.Application {
        const port = process.env.PORT || 8080;

        const userDA = UsersDa.getInstance();
        const imageDA = ImageDa.getInstance();
        const dallE = new DallEService();
        const wordGenerator = new WordGeneratorService();
        const userService = new UserService(userDA);
        const imageService = new ImageService(dallE, wordGenerator, userService, imageDA);
        const authService = new AuthService(userService);

        this.server = new Server(Number.parseInt(port.toString()), [
                new DefaultController(),
                new AuthController(authService),
                new UserController(userService),
                new ImageController(imageService)
            ]
        );

        this.server.listen();
        return this.server.app;
    }
}
