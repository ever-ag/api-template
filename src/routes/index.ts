import { Router } from 'express';
import jwtAuthRoutes from './jwtAuthRoutes';
import localAuthRoutes from './localAuthRoutes';
import unauthenticatedRoutes from './unauthenticated';
import passport from '../auth';

const app = Router();

app.use(passport.initialize({ userProperty: 'context' }));
app.use('/public', unauthenticatedRoutes);
app.use('/auth', localAuthRoutes);
app.use('/api', jwtAuthRoutes);

export default app;
