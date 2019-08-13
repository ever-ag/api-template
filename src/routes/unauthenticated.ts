import { Router } from 'express';
import * as postRoutes from '../controllers/posts';
import * as asyncRoutes from '../controllers/async';
import asyncRouteWrapper from '../helpers/asyncRouteWrapper';

const app = Router();

app.get('/posts', postRoutes.index);
app.get('/posts/:id', postRoutes.show);

/**
 * When a route returns a promise it needs to be wrapped
 * in the async route handler
 */
app.get('/async_route', asyncRouteWrapper(asyncRoutes.successRoute));

/**
 * An unhandled error thrown in an async route will not be
 * passed to the error handling middleware, and no response will be sent
 * to the client
 *
 * Example:
 */
app.get('/handled_error', asyncRouteWrapper(asyncRoutes.errorRoute));
app.get('/unhandled_error', asyncRoutes.errorRoute);

export default app;
