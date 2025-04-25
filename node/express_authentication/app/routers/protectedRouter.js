// ----- import built-in modules -----
import { Router } from 'express';

// ----- import custom modules -----
import { isAuthenticated } from '../controllers/protectedController.js';

const protectedRouter = Router();

protectedRouter.get('/', async (req, res) => {
    const { auth } = req.cookies;

    if (auth && auth.startsWith('Basic') && await isAuthenticated(auth)) {
        res.render('protected', { h1: 'Protected' });
    } else {
        res.sendStatus(401);
    }

});

export default protectedRouter;