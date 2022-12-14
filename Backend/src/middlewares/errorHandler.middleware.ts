import {HttpException} from "../exceptions/HttpException";
import express, {NextFunction} from "express";
import {logger} from "../logger/logger";


export function errorHandlerMiddleware(error: any, request: express.Request, response: express.Response, next: NextFunction) {
    const message = error.message || 'Something went wrong';
    if (error instanceof HttpException) {
        const status = error?.status;

        let payload = {
            message: message
        }

        if(status !== 401) {
            logger.warn(error);
        }
        response.status(status).json(payload);
    } else {
        let payload = {
            error: {
                message: message
            }
        }

        response.status(500).json(payload);
    }
}
