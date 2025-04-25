// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { register } from '../controllers/registerController.js';

const registerRouter = Router();

registerRouter.route('/')
    .get((req, res) => {
        res.render('register', { h1: 'Register', action: 'register' });
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        const result = await register(username, password);

        res.status(result.statusCode).json(result);
    });

export default registerRouter;

