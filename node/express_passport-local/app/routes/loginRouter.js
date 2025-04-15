import { Router } from 'express';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';
import configurePassport from '../config/passportConfig.js';

const loginRouter = new Router();

configurePassport();

loginRouter.route('/')
    .get((req, res) => {
        res.render('login', { h1: 'Login Page' });
    })
    .post(authenticateMiddleware);

export default loginRouter;