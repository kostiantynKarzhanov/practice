import { Router } from 'express';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const loginRouter = new Router();

loginRouter.route('/')
    .get((req, res) => res.render('login', { h1: 'Login Page' }))
    .post(authenticateMiddleware);

export default loginRouter;