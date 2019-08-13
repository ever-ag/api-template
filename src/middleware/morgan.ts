import * as morgan from 'morgan';

morgan.token('user-id', req => {
    if (req && req.context) {
        return String(req.context.id);
    }
    return '';
});

morgan.token('sanitized-body', req => {
    if (req && req.body) {
        if (req.body.password) {
            req.body.password = '**REDACTED**';
        }
        return JSON.stringify(req.body);
    }
    return '';
});

const morganTokenString =
    ':remote-addr :user-id :[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :sanitized-body';

const morganMiddleware = morgan(morganTokenString, {
    skip(req, res) {
        if (
            res.statusCode >= 400 ||
            process.env.LOG_SUCCESSFUL_REQUESTS ||
            req.method === 'POST' ||
            req.method === 'PATCH' ||
            req.method === 'PUT' ||
            req.method === 'DELETE'
        ) {
            return false;
        }
        return true;
    },
});

export default morganMiddleware;
