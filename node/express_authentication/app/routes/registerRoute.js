import { Router } from 'express';

const registerRouter = new Router();

registerRouter.route('/')
    .get((req, res) => {
        res.render('register', { h1: 'Register', action: 'register' });
    })
    .post((req, res) => {
        res.redirect('/');
    });

export default registerRouter;

