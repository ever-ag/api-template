import { RequestHandler } from 'express';
import AuthService from '../services/auth';

export const login: RequestHandler = (req, res) => {
    return res.json(AuthService.login(req.context));
};
