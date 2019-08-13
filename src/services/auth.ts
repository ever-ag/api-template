import UserModel from '../models/User';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';

const JWT_KEY = 'super_secret_key';

export default class AuthService {
    public static validateUser(username: string, password: string) {
        const user = UserModel.findBy({ username });
        if (user && user.password === password) {
            return true;
        }
        return false;
    }

    public static login(context: Request['context']) {
        const payload = { sub: context.id };
        return {
            access_token: sign(payload, JWT_KEY, { expiresIn: '60m' }),
        };
    }
}
