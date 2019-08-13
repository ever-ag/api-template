import { RequestHandler } from 'express';

export default (route: RequestHandler) => {
    const routeFunction: RequestHandler = (req, res, next) => {
        return Promise.resolve(route(req, res, next)).catch(next);
    };
    return routeFunction;
};
