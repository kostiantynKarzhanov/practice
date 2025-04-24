import { Router } from 'express';
import { createUser } from '../controllers/registerController.js';

const registerRouter = new Router();

registerRouter.route('/')
    .get((req, res) => {
        res.render('register', { h1: 'Register', action: 'register' });
    })
    .post(async (req, res) => {
        const { username, password } = req.body;

        const result = await createUser(username, password);
        res.status(result.statusCode).json(result);
    });

export default registerRouter;

