import * as Express from 'express';
import corsMiddleware from './middleware/cors';
import { formBodyParserMiddleware, jsonBodyParserMiddleware } from './middleware/bodyParser';
import morganMiddleware from './middleware/morgan';
import errorMiddleware from './middleware/error';
import routes from './routes';
import { HttpError } from './helpers/HttpError';

const app = Express();

/** Load application middleware */
app.use(corsMiddleware);
app.use(formBodyParserMiddleware);
app.use(jsonBodyParserMiddleware);
app.use(morganMiddleware);

/** Load application routes */
app.use(routes);

/** Return 404 for requested resources not found */
app.use((req, res) => {
    throw new HttpError(404);
});

/** Load error middleware */
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
