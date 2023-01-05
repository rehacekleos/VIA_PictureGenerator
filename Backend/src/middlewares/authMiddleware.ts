import express from "express";
import {ConfigFactory} from '../factories/configFactory';
import {HttpException} from '../exceptions/HttpException';
const jwt = require('jsonwebtoken');

export function AuthMiddleware(request: express.Request, response: express.Response, next) {
    const header = request.header("Authorization");
    if (header?.startsWith('Bearer')){
        const token = header?.split(' ')[1];
        if (token){
            try {
                const decoded = jwt.verify(token, ConfigFactory.getConfig().jwtSecret);
                request['user'] = decoded;
                console.log(decoded)
                next();
                return;
            } catch (e) {
            }
        }
    }
    next(new HttpException(401, 'Wrong authorization token!'))
}