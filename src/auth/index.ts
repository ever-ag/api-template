import * as passport from 'passport';
import localStrategy from './local';
import jwtStrategy from './jwt';

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
