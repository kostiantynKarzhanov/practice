import { Router } from 'express';
import { UserModel } from '../config/databaseConfig.js';
import { hashPassword } from '../lib/passwordUtils.js';

const registerRouter = new Router();

registerRouter.route('/')
    .get((req, res) => {
        res.render('register', { h1: 'Register Page' });
    })
    .post((req, res) => {
        const { name, pass } = req.body;
        const { hash, salt } = hashPassword(pass);

        const user = new UserModel({ name, hash, salt });

        user.save()
            .then(user => {
                console.log('--- new user ---');
                console.log(`name: ${user.name}\nid: ${user.id}`);
            });
        
        req.login(user, err => {
            if (err) return next(err);
            
            return res.redirect('/');
        });

    });

export default registerRouter;