// ----- import built-in modules -----
import passport from 'passport';

// ----- import custom modules -----
import passportLocalStrategy from './passportLocalStrategyConfig.js';
import { findUserById } from '../services/userService.js';

const configurePassport = () => {
    passport.use(passportLocalStrategy);

    // To maintain a login session, Passport serializes and deserializes user information to and from the session.
    // it is recommended that any user information needed on every request to the application be stored in the session. 
    // For example, if the application displays a user element containing the user's name, email address, and photo on every page, that information should be stored in the session to eliminate what would otherwise be frequent database queries. 
    // Specific routes, such as a checkout page, that need additional information such as a shipping address, can query the database for that data.

    // If user successfully verified, Passport will call the serializeUser function
    passport.serializeUser((user, done) => {
        queueMicrotask(() => done(null, user.id));
    });

    // When the session is authenticated, Passport will call the deserializeUser function. 
    // The req.user property is then set to the yielded information from the req.session.passport.user.
    passport.deserializeUser(async (userId, done) => {
        try {
            const { id, name } = await findUserById(userId);

            return done(null, { id, username: name });
        } catch (err) {
            return done(err);
        }
    });
};

export default configurePassport;