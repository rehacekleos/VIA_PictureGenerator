import {ServerCloudBootstrap} from '../bootstrap/server/serverCloud.bootstrap';

export class ServerFactory {
    /**
     * Function that return server instance depending on APP_MODE variable value.
     *
     * @returns {ServerCloudBootstrap} Server instance for express application.
     */
    public static getServerInstance() {

        const type = process.env.APP_MODE;

        switch (type) {
            default:
                return new ServerCloudBootstrap();
        }
    }
}
