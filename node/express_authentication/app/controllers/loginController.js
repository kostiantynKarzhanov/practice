// ----- import services -----
import { loginUser } from '../services/userService.js';

const renderLoginView = (req, res) => {
    return res.render('login', { h1: 'Login', action: 'login' });
};

const handleLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const authCookieValue = await loginUser(username, password);
        
        if (authCookieValue) {
            const authCookieOptions = {
                httpOnly: true,
                maxAge: (1000 * 60 * 60) // 1 hour
            };
    
            res.cookie('auth', authCookieValue, authCookieOptions);
            return res.redirect(303, '/protected');
        } else {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Invalid credentials.' 
            });
        }
    } catch (err) {
        console.error(err.stack);
            
        return next(err);
    }
};

export { 
    renderLoginView, 
    handleLogin 
};

