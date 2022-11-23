import {config} from "../config";

export class ConfigFactory {

    constructor() {}

    public static getConfig(){

        const type = process.env.APP_MODE;

        switch (type) {
            default:
                return config();
        }
    }
}