import { Router } from 'express';
import passport from '../auth';
import * as postRoutes from '../controllers/posts';

const app = Router();
app.use(passport.authenticate('jwt', { session: false }));

app.get('/posts', postRoutes.index);
app.get('/posts/:id', postRoutes.show);
app.post('/posts', postRoutes.create);
app.patch('/posts/:id', postRoutes.update);
app.delete('/posts/:id', postRoutes.destroy);

export default app;
