// ----- import services -----
import { loginUser } from '../services/userService.js';

const renderLoginView = (req, res) => res.render('login', { h1: 'Login', action: 'login' });

const handleLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const cookie = await loginUser(username, password);

        if (cookie) {
            const { name, value, options } = cookie;
            
            res.cookie(name, value, options);

            return res.redirect(303, '/protected');
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

