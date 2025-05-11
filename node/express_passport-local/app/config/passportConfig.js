import passport from 'passport';
import localStrategy from './passportLocalConfig.js';
import { UserModel } from './databaseConfig.js';

const configurePassport = () => {
    passport.use(localStrategy);

    passport.serializeUser((user, done) => {
        queueMicrotask(() => {
            done(null, user.id);
        });
    });

    passport.deserializeUser((id, done) => {
    	UserModel.findById(id)
    		.then((user) => {
    			done(null, user);
    		})
    		.catch(err => done(err))
    });
}

export default configurePassport;