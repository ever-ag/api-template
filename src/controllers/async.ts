import { RequestHandler } from 'express';
import { HttpError } from '../helpers/HttpError';

/** An example async route that does not throw an error */
export const successRoute: RequestHandler = async (req, res) => {
    await Promise.resolve();
    return res.send('Done!');
};

/** An example async route that throws an error */
export const errorRoute: RequestHandler = async (req, res) => {
    throw new HttpError(501, 'Not implemented');
};
