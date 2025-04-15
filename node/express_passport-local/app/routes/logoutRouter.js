import { Router } from 'express';

const logoutRouter = new Router();

logoutRouter.all('/', function (req, res, next) {
    req.logout((err) => {
        if (err) return next(err);
        
        res.redirect('/');
    });
});

export default logoutRouter;