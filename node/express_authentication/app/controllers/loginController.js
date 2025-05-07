// ----- import services -----
import { verifyUser } from '../services/userService.js';

const renderLoginView = (req, res) => {
    return res.render('login', { h1: 'Login', action: 'login' });
};

const handleLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const isVerified = await verifyUser(username, password);

        if (isVerified) {
            // regenerate the session, which is good practice to help guard against forms of session fixation
            // a new SID and Session instance will be initialized at req.session
            return req.session.regenerate((err) => {
                if (err) return next(err);

                console.log('session regenerated:', req.session.id);
                req.session.user = username;

                // Save the session back to the store, replacing the contents on the store with the contents in memory. This method is automatically called at the end of the HTTP response if the session data has been altered. Because of this, typically this method does not need to be called. There are some cases where it is useful to call this method, for example, redirects, long-lived requests or in WebSockets.
                
                // save the session before redirection to ensure page load does not happen before session is saved
                return req.session.save((err) => {
                    if (err) return next(err);

                    console.log('session saved:', req.session.id);
                    return res.redirect(303, '/protected');
                });
            });
        }

        return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials.'
        });
    } catch (err) {
        console.error(err.stack);

        return next(err);
    }
};

export {
    renderLoginView,
    handleLogin
};

