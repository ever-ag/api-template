import { Strategy as LocalStrategy } from 'passport-local';
import AuthService from '../services/auth';
import UserService from '../services/user';

export default new LocalStrategy((username, password, done) => {
    const validUser = AuthService.validateUser(username, password);
    console.log(username, password, validUser);
    if (validUser) {
        const user = UserService.findByUsername(username);
        return done(null, user);
    }
    return done('Invalid credentials', false);
});
