import { Router } from 'express';
import passport from '../auth';
import * as authRoutes from '../controllers/auth';

const app = Router();
app.use(passport.authenticate('local', { session: false }));

app.post('/', authRoutes.login);

export default app;
