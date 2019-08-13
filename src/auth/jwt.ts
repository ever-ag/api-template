import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const JWT_KEY = 'super_secret_key';

export default new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_KEY,
    },
    (payload, done) => {
        if (payload.sub) {
            return done(null, { id: payload.sub });
        } else {
            return done('Unable to retrive subject', false);
        }
    },
);
