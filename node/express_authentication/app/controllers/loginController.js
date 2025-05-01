// ----- import services -----
import { loginUser } from '../services/userService.js';
import { createSession, createSessionCookie } from '../services/sessionService.js';

const renderLoginView = (req, res) => {
    return res.render('login', { h1: 'Login', action: 'login' });
};

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const sessionID = await loginUser(username, password);

        if (sessionID) {
            const session = await createSession(sessionID, username);
            const { name, value, options } = createSessionCookie(session);

            res.cookie(name, value, options);

            return res.redirect(303, '/protected');
        } else {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Invalid credentials.' 
            });
        }
    } catch (err) {
        console.error(err.stack);
            
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error.'
        });
    }
};

export { 
    renderLoginView, 
    handleLogin 
};

