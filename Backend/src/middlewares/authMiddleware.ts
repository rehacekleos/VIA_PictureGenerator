import express from "express";
import {ConfigFactory} from '../factories/configFactory';
import {HttpException} from '../exceptions/HttpException';
import {AuthService} from '../auth/services/auth.service';
const jwt = require('jsonwebtoken');

export function AuthMiddleware(request: express.Request, response: express.Response, next) {
    const header = request.header("Authorization");
    if (header?.startsWith('Bearer')){
        const token = header?.split(' ')[1];
        if (token){
            try {
                const decoded = jwt.verify(token, ConfigFactory.getConfig().jwtSecret);
                delete decoded.iat;
                delete decoded.exp;
                request['user'] = decoded;
                const newToken = AuthService.createToken(decoded);
                response.set('Access-Control-Expose-Headers', 'x-new-token')
                response.set('x-new-token', newToken);
                next();
                return;
            } catch (e) {
                console.log(e)
            }
        }
    }
    next(new HttpException(401, 'Wrong authorization token!'))
}