import express from "express";

export function serverMiddleware(request: express.Request, response: express.Response, next) {
    response.set('Server', 'Picture Generator Server');
    next();
}
