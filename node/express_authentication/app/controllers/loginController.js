// ----- import services -----
import { loginUser } from '../services/userService.js';

const renderLoginView = (req, res) => {
    res.render('login', { h1: 'Login', action: 'login' });
};

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const authCookieValue = await loginUser(username, password);
        
        if (authCookieValue) {
            const authCookieOptions = {
                httpOnly: true, 
                maxAge: (1000 * 60 * 60) // 1 hour
            };
    
            res.cookie('auth', authCookieValue, authCookieOptions);
            res.redirect('/protected');
        } else {
            res.status(401).json({ 
                status: 'error', 
                message: 'Invalid credentials.' 
            });
        }
    } catch (err) {
        console.error(err.stack);
            
        res.status(500).json({
            status: 'error',
            message: 'Internal server error.'
        });
    }
};

export { 
    renderLoginView, 
    handleLogin 
};

