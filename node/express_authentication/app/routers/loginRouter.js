import { Router } from 'express';

const loginRouter = Router();

loginRouter.route('/')
    .get((req, res) => {
        res.render('login', { h1: 'Login', action: 'login' });
    })
    .post((req, res) => {
        res.redirect('/');
    });

export default loginRouter;

