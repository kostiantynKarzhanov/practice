// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { verifyUser } from '../controllers/loginController.js';

const loginRouter = Router();

loginRouter.route('/')
    .get((req, res) => {
        res.render('login', { h1: 'Login', action: 'login' });
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        const isVerifiedUser = await verifyUser(username, password);

        if (isVerifiedUser) {
            const credentialsBase64 = Buffer.from(username + ':' + password, 'utf8').toString('base64');
            const credentialsMaxAge = 1000 * 60 * 60; // 1 hour

            res.cookie('auth', `Basic ${credentialsBase64}`, { httpOnly: true, maxAge: credentialsMaxAge });
            res.redirect('/protected');
        } else {
            res.sendStatus(401);
        }
    });

export default loginRouter;

